import { Express } from 'express';
import { WebSocketNotificationService } from './websocket.service';

/**
 * WebSocket module
 */
export class WebSocketModule {
  /**
   * Register module routes and middleware
   * @param app Express application instance
   */
  register(app: Express): void {
    // WebSocket module doesn't need to register routes
    console.log('WebSocket module registered');
  }
  
  /**
   * Get WebSocket notification service
   */
  getNotificationService(): typeof WebSocketNotificationService {
    return WebSocketNotificationService;
  }
}
