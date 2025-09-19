import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import fs from "fs";
import { WebSocketService } from "./websocket.service";

// Read public key to verify JWT tokens
const publicKey = fs.readFileSync("./src/auth/jwtRS256.key.pub");

// Store messages by monument
let messages: { [key: string]: any[] } = {};

/**
 * Configure the WebSocket server
 * @param server - HTTP Server
 * @returns Socket.io Server instance
 */
function setupSocketServer(server: HttpServer): Server {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Authentication middleware for WebSocket connections
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Token missing"));
    }

    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        return next(new Error("Invalid token"));
      }
      (socket as any).user = decoded;
      next();
    });
  });

  // Handle connections
  io.on("connection", (socket: Socket) => {
    console.log("🔗 New WebSocket connection established");
    console.log(`👥 Total connected clients: ${io.engine.clientsCount}`);
    console.log(
      `🔑 Connected user: ${(socket as any).user?.userName || "Anonymous"}`,
    );

    // Handle joinMonument event
    socket.on(
      "joinMonument",
      ({ monumentId, role }: { monumentId: string; role: string }) => {
        socket.join(`monument_${monumentId}`);
        console.log(
          `${(socket as any).user.userName} joined room monument_${monumentId} as ${role}`,
        );

        if (!messages[monumentId]) messages[monumentId] = [];

        socket.emit("chatHistory", messages[monumentId]);
      },
    );

    // Handle sendMessage event
    socket.on(
      "sendMessage",
      ({
        monumentId,
        role,
        message,
      }: {
        monumentId: string;
        role: string;
        message: string;
      }) => {
        const msg = {
          user: (socket as any).user.userName,
          role,
          message,
          date: new Date(),
        };

        messages[monumentId].push(msg);
        io.to(`monument_${monumentId}`).emit("newMessage", msg);
      },
    );

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  // Initialize WebSocket service with io instance
  WebSocketService.initialize(io);

  return io;
}

export default setupSocketServer;
export { WebSocketService };
