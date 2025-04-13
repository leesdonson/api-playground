import { Router } from "express";
import {
  addComment,
  deleteComment,
  editComment,
  getComment,
  getComments,
} from "../controllers/comment.control";

const router = Router();

//add comment
router.post("/add-comment", addComment);

//get all comments
router.get("/", getComments);

//get comment details
router.get("/comment/:id", getComment);

//edit comment
router.patch("/comment/:id", editComment);

//delete comment
router.delete("/comment/:id", deleteComment);

export default router;
