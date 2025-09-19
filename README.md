# Monumento API

REST API for managing historical monuments, with favorites system and real-time notifications. Developed in TypeScript for better maintainability and robustness.

## Technologies Used

- Node.js
- TypeScript
- Express
- Sequelize (MySQL)
- Socket.io
- JWT for authentication
- Swagger for documentation

## Features

- Complete CRUD for monuments
- Authentication system (registration, login, token refresh)
- Favorites system for users
- Real-time notifications via WebSocket
- API documentation with Swagger

## Project Structure

```text
monumento-api/
├── src/
│   ├── config/             # Configuration (database, etc.)
│   ├── controllers/        # Controllers
│   ├── middlewares/        # Middlewares
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── services/           # Business services
│   ├── types/              # TypeScript types and interfaces
│   ├── utils/              # Utilities
│   ├── websockets/         # WebSocket management
│   └── server.ts           # Application entry point
├── dist/                   # Compiled code (generated)
├── node_modules/           # Dependencies
├── package.json            # Project configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Documentation
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ehformation/monumento-api.git
   cd monumento-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the database:
   - Create a MySQL database named `monumento`
   - Modify connection parameters in `src/config/database.ts` if necessary

4. Generate JWT keys (done automatically during build):

   ```bash
   ts-node src/auth/generate-keys.ts
   ```

5. Compile TypeScript code:

   ```bash
   npm run build
   ```

6. Start the server:

   ```bash
   npm start
   ```

   For development:

   ```bash
   npm run dev
   ```

   Or use the startup script:

   ```bash
   ./start.sh        # Production mode
   ./start.sh dev    # Development mode
   ```

## API Endpoints

### Authentication

- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/refresh-token` - Token refresh

### Monuments

- `GET /api/monuments` - Get all monuments
- `GET /api/monuments/search` - Search monuments
- `GET /api/monuments/:id` - Get monument by ID
- `POST /api/monuments` - Create a monument
- `PUT /api/monuments/:id` - Update a monument
- `DELETE /api/monuments/:id` - Delete a monument

### Favorites

- `GET /api/favorites` - Get favorites for connected user
- `POST /api/favorites/:monumentId` - Add a monument to favorites
- `DELETE /api/favorites/:monumentId` - Remove a monument from favorites

## WebSocket

The WebSocket server is accessible at `ws://localhost:3000`. Available events are:

- `newMonument` - Notification sent when a new monument is created

## Documentation

Swagger documentation is available at `http://localhost:3000/api-docs`.
