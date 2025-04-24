import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ErrorHandler from "../utils/errorHandler";
import { prisma } from "../utils/client";

const addComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const id = req?.user?.id;
    const { description } = req.body;

    if (!id) {
      const error = new ErrorHandler("Operation could not be completed.", 404);
      return next(error);
    }
    if (!postId) {
      const error = new ErrorHandler("Post id is required.", 404);
      return next(error);
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      const error = new ErrorHandler("Operation could not be completed.", 404);
      return next(error);
    }

    const comment = await prisma.comment.create({
      data: {
        description,
        commentBy: user?.name,
        postId,
      },
    });

    if (!comment) {
      const error = new ErrorHandler(
        "Operation could not be completed. Please try again later.",
        404
      );
      return next(error);
    }

    res.status(201).json({
      statusTxt: "success",
      message: "Comment added successfully",
      data: {
        comment,
      },
    });
  }
);

const getComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const id = req?.user?.id;
    if (!id) {
      const error = new ErrorHandler("Operation could not be completed.", 404);
      return next(error);
    }

    if (!postId) {
      const error = new ErrorHandler("Post id is required.", 404);
      return next(error);
    }

    const comment = await prisma.comment.findFirst({
      where: {
        postId: postId,
        commentBy: id,
      },
    });

    if (!comment) {
      const error = new ErrorHandler("Comment not found", 404);
      return next(error);
    }

    if (comment.commentBy !== id) {
      const error = new ErrorHandler("Operation could not be completed.", 404);
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Comment found",
      data: {
        comment,
      },
    });
  }
);

const getComments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const id = req?.user?.id;
    if (!id) {
      const error = new ErrorHandler("Operation could not be completed.", 404);
      return next(error);
    }

    if (!postId) {
      const error = new ErrorHandler("Post id is required.", 404);
      return next(error);
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        reply: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!comments) {
      const error = new ErrorHandler("Comments not found", 404);
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Comments found",
      data: {
        comments,
      },
    });
  }
);

const editComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: commentId, postId } = req.params;
    const userId = req?.user?.id;

    if (!userId) {
      const error = new ErrorHandler("Operation could not be completed.", 404);
      return next(error);
    }

    if (!commentId) {
      const error = new ErrorHandler("Comment id is required.", 404);
      return next(error);
    }

    if (!postId) {
      const error = new ErrorHandler("Post id is required.", 404);
      return next(error);
    }

    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        postId: postId,
        commentBy: userId,
      },
    });

    if (!comment) {
      const error = new ErrorHandler("Comment not found", 404);
      return next(error);
    }
    const like = parseInt(req.body.like);

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        description: req.body.description || comment.description,
        like: like || comment.like,
      },
    });

    if (!updatedComment) {
      const error = new ErrorHandler(
        "Operation could not be completed. Please try again later.",
        404
      );
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Comment updated successfully",
      data: {
        comment: updatedComment,
      },
    });
  }
);

const deleteComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: commentId, postId } = req.params;
    const userId = req?.user?.id;

    if (!userId) {
      const error = new ErrorHandler("Operation could not be completed.", 404);
      return next(error);
    }

    if (!commentId) {
      const error = new ErrorHandler("Comment id is required.", 404);
      return next(error);
    }

    if (!postId) {
      const error = new ErrorHandler("Post id is required.", 404);
      return next(error);
    }

    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        postId: postId,
        commentBy: userId,
      },
    });

    if (!comment) {
      const error = new ErrorHandler("Comment not found", 404);
      return next(error);
    }

    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    if (!deletedComment) {
      const error = new ErrorHandler(
        "Operation could not be completed. Please try again later.",
        404
      );
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Comment deleted successfully",
    });
  }
);

export { addComment, getComment, getComments, editComment, deleteComment };
