import { Express, Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authMiddleware } from './auth.middleware';
import rateLimit from 'express-rate-limit';

// Rate limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    message: "Too many login attempts. Please try again later.",
    data: null
  }
});

/**
 * Authentication module
 */
export class AuthModule {
  private readonly authController: AuthController;
  
  constructor() {
    const authService = new AuthService();
    this.authController = new AuthController(authService);
  }
  
  /**
   * Register module routes and middleware
   * @param app Express application instance
   */
  register(app: Express): void {
    const router = Router();
    
    // Apply auth middleware globally
    app.use(authMiddleware);
    
    // Define routes
    router.post('/login', loginLimiter, this.authController.login.bind(this.authController));
    router.post('/register', this.authController.register.bind(this.authController));
    router.post('/refresh-token', this.authController.refreshToken.bind(this.authController));
    
    // Register routes with prefix
    app.use('/api', router);
  }
}
