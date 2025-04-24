import { Router } from "express";
import {
  addComment,
  deleteComment,
  editComment,
  getComment,
  getComments,
} from "../controllers/comment.control";
import { auth } from "../middleware/auth";

const router = Router();

//add comment
router.post("/add-comment/:postId", auth, addComment);

//get all comments
router.get("/:postId", auth, getComments);

//get comment details
router.get("/comment/:postId", auth, getComment);

//edit comment
router.patch("/comment/:postId/:id", auth, editComment);

//delete comment
router.delete("/comment/:postId/:id", auth, deleteComment);

export default router;
