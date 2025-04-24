import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

// Add reply to comment
const addReply = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Add reply to comment");
  }
);

// Get replies to comment
const getReplies = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Get replies to comment");
  }
);

// Delete reply
const deleteReply = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Delete reply");
  }
);

// Update reply
const updateReply = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Update reply");
  }
);

export { addReply, getReplies, deleteReply, updateReply };
