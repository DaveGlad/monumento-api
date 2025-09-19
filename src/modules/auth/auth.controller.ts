import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { handleError } from '../../common/filters/http-exception.filter';

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

/**
 * Controller for authentication management
 */
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @swagger
   * /api/login:
   *   post:
   *     summary: User login
   *     description: Authenticates a user and returns JWT tokens
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LoginResponse'
   *       401:
   *         description: Invalid credentials
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       429:
   *         description: Too many login attempts
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   * 
   * Authenticate a user
   * @param req - Express Request
   * @param res - Express Response
   */
  async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body as LoginDto;

    // Data validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
        data: null
      });
    }

    try {
      const authData = await this.authService.login(username, password);

      return res.json({
        message: "Authentication successful",
        data: authData
      });
    } catch (error: any) {
      // Specific handling for authentication errors
      if (error.message === 'User not found') {
        return res.status(401).json({
          message: "User not found",
          data: null
        });
      }

      if (error.message === 'Incorrect password') {
        return res.status(401).json({
          message: "Incorrect password",
          data: null
        });
      }

      const message = "Authentication error";
      return handleError(res, error, message);
    }
  }

  /**
   * @swagger
   * /api/register:
   *   post:
   *     summary: User registration
   *     description: Registers a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterRequest'
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: User registered successfully
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Invalid input or username already exists
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   * 
   * Register a new user
   * @param req - Express Request
   * @param res - Express Response
   */
  async register(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body as RegisterDto;

    // Data validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
        data: null
      });
    }

    try {
      const user = await this.authService.register(username, password);

      return res.status(201).json({
        message: "User created successfully",
        data: {
          id: user.id,
          username: user.username
        }
      });
    } catch (error: any) {
      // Specific handling for registration errors
      if (error.message === 'This user already exists') {
        return res.status(409).json({
          message: "This user already exists",
          data: null
        });
      }

      const message = "Registration error";
      return handleError(res, error, message);
    }
  }

  /**
   * @swagger
   * /api/refresh-token:
   *   post:
   *     summary: Refresh access token
   *     description: Refreshes an access token using a refresh token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RefreshTokenRequest'
   *     responses:
   *       200:
   *         description: Token refreshed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Token refreshed successfully
   *                 data:
   *                   type: object
   *                   properties:
   *                     accessToken:
   *                       type: string
   *                       description: New JWT access token
   *       401:
   *         description: Invalid or expired refresh token
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   * 
   * Refresh access token
   * @param req - Express Request
   * @param res - Express Response
   */
  async refreshToken(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body as RefreshTokenDto;

    // Data validation
    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token is required",
        data: null
      });
    }

    try {
      const accessToken = await this.authService.refreshToken(refreshToken);

      return res.json({
        message: "Access token refreshed successfully",
        data: { accessToken }
      });
    } catch (error: any) {
      // Specific handling for token refresh errors
      if (error.message === 'Invalid refresh token' || error.message === 'Refresh token expired') {
        return res.status(401).json({
          message: error.message,
          data: null
        });
      }

      const message = "Error refreshing token";
      return handleError(res, error, message);
    }
  }
}
