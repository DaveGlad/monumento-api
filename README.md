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
│   ├── common/             # Common components (middlewares, filters, etc.)
│   ├── config/             # Configuration (database, environment, etc.)
│   ├── models/             # Sequelize models
│   ├── modules/            # Application modules
│   │   ├── auth/           # Authentication module
│   │   ├── favorites/      # Favorites management module
│   │   ├── monuments/      # Monuments management module
│   │   ├── users/          # Users management module
│   │   └── websocket/      # WebSocket management module
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

4. Configure JWT keys in your `.env` file:

   ```
   JWT_PRIVATE_KEY=your_private_key
   JWT_PUBLIC_KEY=your_public_key
   JWT_ALGORITHM=RS256
   JWT_ACCESS_TOKEN_EXPIRY=30m
   JWT_REFRESH_TOKEN_EXPIRY=7d
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
- `GET /api/monuments/{id}` - Get monument by ID
- `POST /api/monuments` - Create a monument
- `PUT /api/monuments/{id}` - Update a monument
- `DELETE /api/monuments/{id}` - Delete a monument

### Favorites

- `GET /api/favorites` - Get favorites for connected user
- `POST /api/favorites` - Add a monument to favorites
- `DELETE /api/favorites/{monumentId}` - Remove a monument from favorites

### Users

- `GET /api/users/profile` - Get profile of connected user
- `GET /api/users` - Get all users (admin only)

## WebSocket

The WebSocket server is accessible at `ws://localhost:3000`. To connect:

```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your_jwt_token'
  }
});
```

### Available Events

#### Send Events

```javascript
// Send a message about a monument
socket.emit('send_message', {
  monumentId: 1,
  message: 'This monument is amazing!'
});
```

#### Receive Events

```javascript
// Receive monument messages
socket.on('monument_message', (data) => {
  console.log(`Monument ${data.monumentId}: ${data.message} (from ${data.user})`);
});

// Receive new monument notifications
socket.on('newMonument', (monument) => {
  console.log('New monument added:', monument);
});
```

## Documentation

Detailed Swagger documentation is available at `http://localhost:3000/api-docs`.

You can also access the raw Swagger JSON at `http://localhost:3000/swagger.json`.

### Swagger Tags

- **Authentication**: User authentication operations
- **Monuments**: Monument management operations
- **Favorites**: User favorites management
- **Users**: User management operations
- **WebSockets**: WebSocket communication for real-time updates
