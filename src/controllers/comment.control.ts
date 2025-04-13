import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

const addComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("add new comment");
  }
);
const getComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("get comment");
  }
);

const getComments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("get comments");
  }
);

const editComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("edit comment");
  }
);

const deleteComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("delete comment");
  }
);

export { addComment, getComment, getComments, editComment, deleteComment };
