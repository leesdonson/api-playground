import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

export const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.access_token;

      // if no token, do something

      //decode the token

      //if invalid token, do something

      // get user using the id form the decoded user from db (pg prisma)

      //if no user, do something

      // assign req.user = user

      //next()
    } catch (error) {
      //instantiate new error middleware
      // return next(err)
    }
  }
);
