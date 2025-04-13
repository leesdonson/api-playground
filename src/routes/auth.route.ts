import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.control";

const router = Router();

//signUp
router.post("/sign-up", signUp);

//signIn
router.post("/sign-in", signIn);

//signOut
router.get("/sign-out", signOut);

export default router;
