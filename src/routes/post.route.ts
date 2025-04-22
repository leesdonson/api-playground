import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getPostDetails,
  getPosts,
} from "../controllers/post.control";
import { auth } from "../middleware/auth";

const router = Router();

//add post
router.post("/create-post", auth, createPost);

//get all posts
router.get("/", auth, getPosts);

//get post detail
router.get("/post/:id", auth, getPostDetails);

//edit post
router.patch("/post/:id", auth, editPost);

//delete post
router.delete("/post/:id", auth, deletePost);

export default router;
