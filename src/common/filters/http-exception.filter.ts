import { Response } from "express";

/**
 * Handles errors in a centralized way
 * @param res - Express Response object
 * @param error - Error to handle
 * @param message - Error message to display
 */
export const handleError = (
  res: Response,
  error: any,
  message: string,
): Response => {
  console.error("Error:", error);

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      message,
      data: error.errors.map((e: any) => e.message),
    });
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      message,
      data: error.errors.map((e: any) => e.message),
    });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Refresh token has expired",
      data: null,
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Refresh token is invalid",
      data: null,
    });
  }

  return res.status(500).json({
    message: "An error occurred. Please try again later.",
    data: null,
  });
};
