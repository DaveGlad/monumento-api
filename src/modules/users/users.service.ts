import { User } from '../../config/database';

/**
 * Service for users management
 */
export class UsersService {
  /**
   * Find a user by username
   * @param username - Username to search for
   * @returns User if found, null otherwise
   */
  async findByUsername(username: string): Promise<any> {
    try {
      return await User.findOne({ where: { username } });
    } catch (error: any) {
      throw new Error(`Error finding user by username: ${error.message}`);
    }
  }

  /**
   * Find all users
   * @returns Array of users
   */
  async findAll(): Promise<any[]> {
    try {
      return await User.findAll();
    } catch (error: any) {
      throw new Error(`Error finding all users: ${error.message}`);
    }
  }

  /**
   * Find a user by ID
   * @param id - User ID
   * @returns User if found, null otherwise
   */
  async findById(id: number): Promise<any> {
    try {
      return await User.findByPk(id);
    } catch (error: any) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }
}
