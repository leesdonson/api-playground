import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ErrorHandler from "../utils/errorHandler";
import { prisma } from "../utils/client";

// Add reply to comment
const addReply = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const userId = req.user?.id;

    if (!commentId) {
      const error = new ErrorHandler("Comment id is required.", 400);
      return next(error);
    }

    if (!userId) {
      const error = new ErrorHandler("Reply could not be added.", 400);
      return next(error);
    }

    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      const error = new ErrorHandler("Comment not found.", 404);
      return next(error);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      const error = new ErrorHandler("User not found.", 404);
      return next(error);
    }

    const reply = await prisma.reply.create({
      data: {
        description: req.body.description,
        replyBy: user.name,
        commentId: commentId,
      },
    });

    if (!reply) {
      const error = new ErrorHandler("Reply could not be added.", 400);
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Reply added successfully.",
      data: reply,
    });
  }
);

// Get replies to comment
const getReplies = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const userId = req.user?.id;

    if (!commentId) {
      const error = new ErrorHandler("Comment id is required.", 400);
      return next(error);
    }

    if (!userId) {
      const error = new ErrorHandler("Replies could not be fetched.", 400);
      return next(error);
    }

    const replies = await prisma.reply.findMany({
      where: {
        commentId,
      },
    });

    if (!replies) {
      const error = new ErrorHandler("Replies could not be fetched.", 400);
      return next(error);
    }

    if (replies.length === 0) {
      const error = new ErrorHandler("No replies found.", 404);
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Replies fetched successfully.",
      data: replies,
    });
  }
);

// Delete reply
const deleteReply = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId, id } = req.params;
    const userId = req.user?.id;

    if (!commentId) {
      const error = new ErrorHandler("Comment id is required.", 400);
      return next(error);
    }

    if (!id) {
      const error = new ErrorHandler("Reply id is required.", 400);
      return next(error);
    }

    if (!userId) {
      const error = new ErrorHandler("Reply could not be deleted.", 400);
      return next(error);
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      const error = new ErrorHandler("User not found.", 404);
      return next(error);
    }

    const reply = await prisma.reply.findFirst({
      where: {
        id: id,
        commentId: commentId,
        replyBy: user?.name,
      },
    });

    if (!reply) {
      const error = new ErrorHandler("Reply could not be deleted.", 400);
      return next(error);
    }

    const deletedReply = await prisma.reply.delete({
      where: {
        id: id,
      },
    });

    if (!deletedReply) {
      const error = new ErrorHandler("Reply could not be deleted.", 400);
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Reply deleted successfully.",
    });
  }
);

// Update reply
const updateReply = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId, id } = req.params;
    const userId = req.user?.id;

    if (!commentId) {
      const error = new ErrorHandler("Comment id is required.", 400);
      return next(error);
    }

    if (!id) {
      const error = new ErrorHandler("Reply id is required.", 400);
      return next(error);
    }

    if (!userId) {
      const error = new ErrorHandler("Reply could not be updated.", 400);
      return next(error);
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      const error = new ErrorHandler("User not found.", 404);
      return next(error);
    }

    const reply = await prisma.reply.findFirst({
      where: {
        id: id,
        commentId: commentId,
        replyBy: user.name,
      },
    });

    if (!reply) {
      const error = new ErrorHandler("Reply could not be updated.", 400);
      return next(error);
    }

    const like = parseInt(req.body.like);

    if (isNaN(like)) {
      const error = new ErrorHandler("Like must be a number.", 400);
      return next(error);
    }
    const updatedReply = await prisma.reply.update({
      where: {
        id: id,
      },
      data: {
        description: req.body.description || reply.description,
        like: like || reply.like,
      },
    });

    if (!updatedReply) {
      const error = new ErrorHandler("Reply could not be updated.", 400);
      return next(error);
    }

    res.status(200).json({
      statusTxt: "success",
      message: "Reply updated successfully.",
    });
  }
);

export { addReply, getReplies, deleteReply, updateReply };
