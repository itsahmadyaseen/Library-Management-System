import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  borrowBook,
  getAllBorrowedBooks,
  getBorrowedBooks,
  returnBook,
} from "../controllers/transaction.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = new Router();

router.post("/borrow", verifyJWT, roleMiddleware(["admin"]), borrowBook);
router.post("/return", verifyJWT, roleMiddleware(["admin"]), returnBook);
router.get("/fetch-borrowedBooks", verifyJWT, getBorrowedBooks);
router.get(
  "/fetch-all-borrowedBooks",
  verifyJWT,
  roleMiddleware(["admin"]),
  getAllBorrowedBooks
);

export default router;
