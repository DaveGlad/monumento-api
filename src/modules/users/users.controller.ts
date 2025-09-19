import { Request, Response } from 'express';
import { handleError } from '../../common/filters/http-exception.filter';
import { UsersService } from './users.service';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * Controller for users management
 */
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @swagger
   * /api/users/profile:
   *   get:
   *     summary: Get user profile
   *     description: Get the authenticated user's profile information
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User profile retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: User profile retrieved successfully
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized - Invalid or missing token
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
   * Get user profile
   * @param req - Request object
   * @param res - Response object
   */
  async getProfile(req: Request, res: Response): Promise<Response> {
    const username = req.user.userName;

    try {
      const user = await this.usersService.findByUsername(username);
      
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          data: null
        });
      }

      // Remove sensitive information
      const { password, refreshToken, ...userProfile } = user.toJSON();
      
      return res.json({
        message: "User profile retrieved successfully",
        data: userProfile
      });
    } catch (error: any) {
      const message = "Error retrieving user profile";
      return handleError(res, error, message);
    }
  }

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Get all users
   *     description: Get a list of all users (admin only)
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Users retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Users retrieved successfully
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized - Invalid or missing token
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
   * Get all users
   * @param req - Request object
   * @param res - Response object
   */
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.usersService.findAll();
      
      // Remove sensitive information
      const sanitizedUsers = users.map(user => {
        const { password, refreshToken, ...userProfile } = user.toJSON();
        return userProfile;
      });
      
      return res.json({
        message: "Users retrieved successfully",
        data: sanitizedUsers
      });
    } catch (error: any) {
      const message = "Error retrieving users";
      return handleError(res, error, message);
    }
  }
}
