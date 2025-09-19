import { Request, Response, NextFunction } from "express";

/**
 * Middleware to block requests during night hours (maintenance)
 */
export function nightBlockerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 6) {
    return res
      .status(503)
      .json({ message: "Server is under maintenance", data: null });
  } else {
    next();
  }
}
