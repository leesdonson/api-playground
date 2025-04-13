import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Sign up");
  }
);
const signIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Sign in");
  }
);
const signOut = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Sign out");
  }
);

export { signUp, signIn, signOut };
