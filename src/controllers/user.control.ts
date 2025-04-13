import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

const profile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("My profile");
  }
);

const updateProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Update My profile");
  }
);
const deleteProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("delete My profile");
  }
);

export { profile, updateProfile, deleteProfile };
