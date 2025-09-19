import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import { jwtConfig } from '../../config/env.config';

// Store messages by monument
let messages: { [key: string]: any[] } = {};
let io: Server;

/**
 * Setup WebSocket server
 * @param server - HTTP Server
 */
export function setupWebSocketServer(server: HttpServer): void {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Authentication middleware for WebSocket connections
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Token missing"));
    }

    jwt.verify(token, Buffer.from(jwtConfig.publicKey), { algorithms: ['RS256'] } as VerifyOptions, (err, decoded) => {
      if (err) {
        return next(new Error("Invalid token"));
      }
      (socket as any).user = decoded;
      next();
    });
  });

  // Handle connections
  io.on('connection', (socket: Socket) => {
    console.log('🔗 New WebSocket connection established');
    console.log(`👥 Total connected clients: ${io.engine.clientsCount}`);
    console.log(`🔑 Connected user: ${(socket as any).user?.userName || 'Anonymous'}`);

    // Handle joinMonument event
    socket.on("joinMonument", ({monumentId, role}: {monumentId: string, role: string}) => {
      socket.join(`monument_${monumentId}`);
      console.log(`${(socket as any).user.userName} joined room monument_${monumentId} as ${role}`);

      if(!messages[monumentId]) 
        messages[monumentId] = [];

      socket.emit("chatHistory", messages[monumentId]);
    });

    // Handle sendMessage event
    socket.on("sendMessage", ({monumentId, role, message}: {monumentId: string, role: string, message: string}) => {
      const msg = {
        user: (socket as any).user.userName,
        role,
        message,
        date: new Date()
      };

      messages[monumentId].push(msg);
      io.to(`monument_${monumentId}`).emit("newMessage", msg);
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}

/**
 * Service for WebSocket notifications
 */
export class WebSocketNotificationService {
  /**
   * Send a notification to all connected clients for a new monument
   * @param monument - The newly created monument
   */
  static notifyNewMonument(monument: any): void {
    if (!io) {
      console.log('Unable to send notification: io is not initialized');
      return;
    }

    const notificationData = {
      event: 'newMonument',
      data: {
        id: monument.id,
        title: monument.title,
        description: monument.description,
        createdAt: monument.created
      }
    };

    console.log('Sending WebSocket notification:', JSON.stringify(notificationData));
    console.log(`Connected clients: ${io.engine.clientsCount}`);

    io.emit('newMonument', notificationData);
    console.log('Notification sent successfully');
  }
}
