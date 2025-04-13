import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getPostDetails,
  getPosts,
} from "../controllers/post.control";

const router = Router();

//add post
router.post("/create-post", createPost);

//get all posts
router.get("/", getPosts);

//get post detail
router.get("/post/:id", getPostDetails);

//edit post
router.patch("/post/:id", editPost);

//delete post
router.delete("/post/:id", deletePost);

export default router;
