import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("Create new post");
  }
);

const getPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("get all posts");
  }
);

const getPostDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("get post details");
  }
);

const editPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("edit post");
  }
);
const deletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("delete post");
  }
);

export { createPost, getPosts, editPost, getPostDetails, deletePost };
