import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ErrorHandler from "../utils/errorHandler";
import { prisma } from "../utils/client";

const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if (!body.description && !body.thumbnail) {
      const error = new ErrorHandler(
        "Post Description or thumbnail is required.",
        400
      );
      return next(error);
    }

    const author = req.user;
    if (!author) {
      const error = new ErrorHandler("User not found", 404);
      return next(error);
    }

    const post = await prisma.post.create({
      data: {
        description: body.description ? body.description : null,
        thumbnail: body.thumbnail ? body.thumbnail : null,
        user: {
          connect: {
            id: author.id,
          },
        },
      },
    });

    if (!post) {
      const error = new ErrorHandler("Post not created", 400);
      return next(error);
    }

    res.status(201).json({
      statusTxt: "success",
      message: "Post created successfully",
    });
  }
);

const getPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (posts.length === 0) {
      const error = new ErrorHandler("No posts found ", 404);
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Posts",
      data: posts,
    });
  }
);

const getPostDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!post) {
      const error = new ErrorHandler("Post not found", 404);
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Post details",
      data: post,
    });
  }
);

const editPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      const error = new ErrorHandler("Post id is required", 400);
      return next(error);
    }

    const user = req.user;

    const post = await prisma.post.findFirst({
      where: {
        id: id,
        user: {
          id: user?.id,
        },
      },
    });

    if (!post) {
      const error = new ErrorHandler("Post not found", 404);
      return next(error);
    }

    const like = parseInt(req.body.like);

    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        description: req.body.description || post.description,
        thumbnail: req.body.thumbnail || post.thumbnail,
        like: like || post.like,
      },
    });

    if (!updatedPost) {
      const error = new ErrorHandler("Post not updated", 400);
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Post updated successfully",
      data: updatedPost,
    });
  }
);

const deletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = req.user;

    if (!id) {
      const error = new ErrorHandler("Post id is required", 400);
      return next(error);
    }

    const post = await prisma.post.findFirst({
      where: {
        id: id,
        user: {
          id: user?.id,
        },
      },
    });

    if (!post) {
      const error = new ErrorHandler("Post not found", 404);
      return next(error);
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    if (!deletedPost) {
      const error = new ErrorHandler("Post not deleted", 400);
      return next(error);
    }
    res.status(200).json({
      statusTxt: "success",
      message: "Post deleted successfully",
    });
  }
);

export { createPost, getPosts, editPost, getPostDetails, deletePost };
