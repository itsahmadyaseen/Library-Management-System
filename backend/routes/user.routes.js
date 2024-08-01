import { Router } from "express";
import {
  getUserDetails,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", verifyJWT, getUserDetails);

export default router;
