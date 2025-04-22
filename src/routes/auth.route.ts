import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.control";
import { auth } from "../middleware/auth";

const router = Router();

//signUp
router.post("/sign-up", signUp);

//signIn
router.post("/sign-in", signIn);

//signOut
router.get("/sign-out", auth, signOut);

export default router;
