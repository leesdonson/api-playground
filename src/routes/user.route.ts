import { Router } from "express";
import {
  deleteProfile,
  profile,
  updateProfile,
} from "../controllers/user.control";

const router = Router();

//get profile
router.get("/my-profile", profile);

//update pofile
router.patch("/edit-profile", updateProfile);

//delete profile
router.delete("/delete-profile", deleteProfile);

export default router;
