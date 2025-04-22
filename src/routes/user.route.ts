import { Router } from "express";
import {
  deleteProfile,
  profile,
  updateProfile,
} from "../controllers/user.control";
import { auth } from "../middleware/auth";

const router = Router();

//get profile
router.get("/my-profile", auth, profile);

//update pofile
router.patch("/edit-profile", auth, updateProfile);

//delete profile
router.delete("/delete-profile", auth, deleteProfile);

export default router;
