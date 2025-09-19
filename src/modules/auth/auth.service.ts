import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../../config/database";
import { jwtConfig } from "../../config/env.config";

/**
 * Service for authentication management
 */
export class AuthService {
  /**
   * Authenticates a user and generates JWT tokens
   * @param username - Username
   * @param password - Password
   * @returns Authentication information with tokens
   */
  async login(
    username: string,
    password: string,
  ): Promise<{
    userId: number;
    accessToken: string;
    refreshToken: string;
  }> {
    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not found");
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userName: user.username },
      jwtConfig.privateKey,
      {
        algorithm: "RS256",
        expiresIn: jwtConfig.accessTokenExpiry,
      } as SignOptions,
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userName: user.username },
      jwtConfig.privateKey,
      {
        algorithm: "RS256",
        expiresIn: jwtConfig.refreshTokenExpiry,
      } as SignOptions,
    );

    // Decode refresh token to get expiration date
    const decodedRefreshToken = jwt.decode(refreshToken) as jwt.JwtPayload;
    const refreshTokenExpiry = new Date(decodedRefreshToken.exp! * 1000);

    // Update tokens in database
    user.refreshToken = refreshToken;
    user.refreshTokenExpiry = refreshTokenExpiry;
    await user.save();

    return {
      userId: user.id,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Register a new user
   * @param username - Username
   * @param password - Password
   * @returns The created user
   */
  async register(username: string, password: string): Promise<any> {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new Error("This user already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    return user;
  }

  /**
   * Refresh access token from refresh token
   * @param refreshToken - Refresh token
   * @returns New access token
   */
  async refreshToken(refreshToken: string): Promise<string> {
    // Find user by refresh token
    const user = await User.findOne({ where: { refreshToken } });
    if (!user) {
      throw new Error("Invalid refresh token");
    }

    // Check token expiration
    if (user.refreshTokenExpiry && user.refreshTokenExpiry < new Date()) {
      throw new Error("Refresh token expired");
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userName: user.username },
      jwtConfig.privateKey,
      {
        algorithm: "RS256",
        expiresIn: jwtConfig.accessTokenExpiry,
      } as SignOptions,
    );

    return accessToken;
  }
}
