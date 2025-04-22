import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../utils/client";
import ErrorHandler from "../utils/errorHandler";

const profile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      const error = new ErrorHandler("User not found", 404);
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "User profile",
      data: {
        user,
      },
    });
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
