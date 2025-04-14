import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    stack: err.stack,
  });
};

export { errorHandler };
