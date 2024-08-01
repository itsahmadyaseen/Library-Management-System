import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { updateRole, getAllUsers } from "../controllers/admin.controller.js";

const router = Router();

router.get("/fetch-users", verifyJWT, roleMiddleware(["admin"]), getAllUsers);

router.patch("/update-role", verifyJWT, roleMiddleware(["admin"]), updateRole);

export default router;
