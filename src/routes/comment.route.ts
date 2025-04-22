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
router.post("/add-comment", auth, addComment);

//get all comments
router.get("/", auth, getComments);

//get comment details
router.get("/comment/:id", auth, getComment);

//edit comment
router.patch("/comment/:id", auth, editComment);

//delete comment
router.delete("/comment/:id", auth, deleteComment);

export default router;
