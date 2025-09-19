import express, { Request, Response } from 'express';
import http from 'http';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import path from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { initDb } from './config/database';
import { authMiddleware } from './modules/auth/auth.middleware';
import routes, { registerModules } from './routes';
import { setupWebSocketServer } from './modules/websocket/websocket.service';
import { nightBlockerMiddleware } from './common/middlewares/night-blocker.middleware';

// Create Express application
const app = express();
const server = http.createServer(app);

// Setup Socket.io
setupWebSocketServer(server);

// Use the night blocker middleware from common/middlewares

// Initialize database
initDb();

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Monumento API',
      version: '1.0.0',
      description: 'API for managing historical monuments',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middlewares
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(nightBlockerMiddleware)
  .use(favicon(path.join(__dirname, '../favicon.ico')))
  .use(morgan('dev'))
  .use(authMiddleware);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Monumento API! Use the routes to interact with monuments.');
});

// Register all modules
registerModules(app);

// Legacy API Routes
app.use(routes);

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
