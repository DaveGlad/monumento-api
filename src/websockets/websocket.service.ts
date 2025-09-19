import { Server } from 'socket.io';
import { MonumentInstance } from '../models/types/models';

/**
 * Service for WebSocket management
 */
export class WebSocketService {
  private static io: Server;

  /**
   * Initialize the WebSocket service with a Server instance
   * @param io - Socket.io Server instance
   */
  static initialize(io: Server): void {
    WebSocketService.io = io;
  }

  /**
   * Send a notification to all connected clients for a new monument
   * @param monument - The newly created monument
   */
  static notifyNewMonument(monument: MonumentInstance): void {
    if (!WebSocketService.io) {
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

    console.log('Envoi de la notification WebSocket:', JSON.stringify(notificationData));
    console.log(`Nombre de clients connectés: ${WebSocketService.io.engine.clientsCount}`);

    WebSocketService.io.emit('newMonument', notificationData);
    console.log('Notification envoyée avec succès');
  }
}
