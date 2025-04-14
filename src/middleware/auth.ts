import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ErrorHandler from "../utils/errorHandler";
import { prisma } from "../utils/client";
import { verifyToken } from "../utils/generateToken";

export const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.access_token;
      // if no token, do something
      if (!token) {
        const error = new ErrorHandler("Not authorized", 401);
        return next(error);
      }
      //decode the token
      const decoded = verifyToken(token) as { id: string };

      if (!decoded) {
        const error = new ErrorHandler("Invalid token. Not authorized", 401);
        return next(error);
      }

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        const error = new ErrorHandler("User not found", 401);
        return next(error);
      }
      req.user = user;
      next();
    } catch (error) {
      const err = new ErrorHandler(
        (error as Error).message || "No Access Token",
        (error as ErrorHandler).statusCode || 401
      );

      next(err);
    }
  }
);
