import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { handleError } from "../../common/filters/http-exception.filter";

import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

/**
 * Controller for authentication management
 */
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body as LoginDto;

    // Data validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
        data: null,
      });
    }

    try {
      const authData = await this.authService.login(username, password);

      return res.json({
        message: "Authentication successful",
        data: authData,
      });
    } catch (error: any) {
      // Specific handling for authentication errors
      if (error.message === "User not found") {
        return res.status(401).json({
          message: "User not found",
          data: null,
        });
      }

      if (error.message === "Incorrect password") {
        return res.status(401).json({
          message: "Incorrect password",
          data: null,
        });
      }

      const message = "Authentication error";
      return handleError(res, error, message);
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body as RegisterDto;

    // Data validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
        data: null,
      });
    }

    try {
      const user = await this.authService.register(username, password);

      return res.status(201).json({
        message: "User created successfully",
        data: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error: any) {
      // Specific handling for registration errors
      if (error.message === "This user already exists") {
        return res.status(409).json({
          message: "This user already exists",
          data: null,
        });
      }

      const message = "Registration error";
      return handleError(res, error, message);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body as RefreshTokenDto;

    // Data validation
    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token is required",
        data: null,
      });
    }

    try {
      const accessToken = await this.authService.refreshToken(refreshToken);

      return res.json({
        message: "Access token refreshed successfully",
        data: { accessToken },
      });
    } catch (error: any) {
      // Specific handling for token refresh errors
      if (
        error.message === "Invalid refresh token" ||
        error.message === "Refresh token expired"
      ) {
        return res.status(401).json({
          message: error.message,
          data: null,
        });
      }

      const message = "Error refreshing token";
      return handleError(res, error, message);
    }
  }
}
