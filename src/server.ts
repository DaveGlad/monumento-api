import express, { Request, Response } from 'express';
import http from 'http';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import path from 'path';
import { initDb } from './config/database';
import { authMiddleware } from './modules/auth/auth.middleware';
import { setupWebSocketServer } from './modules/websocket/websocket.service';
import { registerModules } from './modules';
import { nightBlockerMiddleware } from './common/middlewares/night-blocker.middleware';
import { setupSwagger } from './config/swagger';

// Create Express application
const app = express();
const server = http.createServer(app);

// Setup Socket.io
setupWebSocketServer(server);

// Use the night blocker middleware from common/middlewares

// Initialize database
initDb().then((success) => {
  if (success) {
    console.log('Database initialized successfully');
  } else {
    console.error('Failed to initialize database');
  }
});

// Middlewares
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(nightBlockerMiddleware)
  .use(favicon(path.join(__dirname, '../favicon.ico')))
  .use(morgan('dev'));

// Setup Swagger Documentation - avant l'authentification pour permettre l'accès à la documentation sans token
setupSwagger(app);

// Middleware d'authentification après Swagger
app.use(authMiddleware);

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Monumento API! Use the routes to interact with monuments.');
});

// Route de test pour la documentation Swagger
app.get('/swagger-test', (req: Request, res: Response) => {
  res.send(`
    <html>
      <head>
        <title>Swagger Test</title>
      </head>
      <body>
        <h1>Swagger Documentation Test</h1>
        <p>Si vous voyez cette page, le serveur fonctionne correctement.</p>
        <p>La documentation Swagger devrait être disponible à <a href="/api-docs">/api-docs</a>.</p>
        <p>Vous pouvez également accéder à la documentation JSON brute à <a href="/swagger.json">/swagger.json</a>.</p>
      </body>
    </html>
  `);
});

// Route pour accéder à la documentation JSON brute
app.get('/swagger.json', (req: Request, res: Response) => {
  const swaggerJsDoc = require('swagger-jsdoc');
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Monumento API',
        version: '1.0.0',
      },
    },
    apis: ['./src/**/*.ts'],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  res.json(swaggerDocs);
});

// Register all modules
registerModules(app);

// Handle not found routes
app.use((req: Request, res: Response) => {
  const url = req.originalUrl;
  const method = req.method;
  const message = `Requested resource: "${method} ${url}" does not exist. Try with another URL.`;
  res.status(404).json({ message, data: null });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server & Socket.io running at http://localhost:${PORT}`);
});

export default server;
