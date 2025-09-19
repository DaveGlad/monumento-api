import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import { jwtConfig } from '../../config/env.config';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * JWT Authentication middleware
 * Verifies JWT token validity and adds the user to the request
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  // Public routes that don't require authentication
  const publicRoutes = [
    '/api/login',
    '/api/register',
    '/api/refresh-token',
    '/api-docs'
  ];

  // Check if the route is public
  if (publicRoutes.includes(req.path) || req.path.startsWith('/api-docs/')) {
    return next();
  }

  // Check for authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Authentication token missing", data: null });
  }

  // Extract token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing", data: null });
  }

  try {
    // Verify and decode token
    const decoded = jwt.verify(token, jwtConfig.publicKey, { algorithms: ['RS256'] } as VerifyOptions);
    
    // Add user information to the request
    req.user = decoded;
    
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid authentication token", data: null });
  }
};
