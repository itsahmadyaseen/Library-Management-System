import { Router } from "express";
import {
  getAllUsers,
  getUserDetails,
  loginUser,
  logout,
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
router.post("/logout", verifyJWT, logout);


export default router;
