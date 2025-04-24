import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  addReply,
  deleteReply,
  getReplies,
  updateReply,
} from "../controllers/reply.control";

const router = Router();

// Add reply to comment
router.post("/add-reply/:commentId", auth, addReply);

//Get all replies to comment
router.get("/:commentId", auth, getReplies);

//Delete reply
router.delete("/reply/:commentId/:id", auth, deleteReply);

//Update reply
router.patch("/reply/:commentId/:id", auth, updateReply);

export default router;
