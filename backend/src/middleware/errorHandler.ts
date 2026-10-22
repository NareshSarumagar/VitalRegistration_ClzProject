
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  const error = err as {
    name?: string;
    message?: string;
  };

  if (error.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Please check the submitted data."
    });
    return;
  }

  if (error.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "Invalid ID format."
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error."
  });
}
