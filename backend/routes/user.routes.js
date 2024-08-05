import { Router } from "express";
import {
  getAllUsers,
  getUserDetails,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", verifyJWT, getUserDetails);
router.get(
  "/fetch-all-users",
  verifyJWT,
  roleMiddleware(["admin"]),
  getAllUsers
);

export default router;
