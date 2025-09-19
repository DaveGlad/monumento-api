import { Request, Response } from 'express';
import { handleError } from '../../common/filters/http-exception.filter';
import { User } from '../../config/database';

// Définition inline du service utilisateur
class UsersService {
  async findByUsername(username: string): Promise<any> {
    try {
      return await User.findOne({ where: { username } });
    } catch (error: any) {
      throw new Error(`Error finding user by username: ${error.message}`);
    }
  }

  async findAll(): Promise<any[]> {
    try {
      return await User.findAll();
    } catch (error: any) {
      throw new Error(`Error finding all users: ${error.message}`);
    }
  }
}




/**
 * Controller for users management
 */
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
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
