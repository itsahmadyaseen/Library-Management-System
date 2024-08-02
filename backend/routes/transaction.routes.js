import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  borrowBook,
  getBorrowedBooks,
  returnBook,
} from "../controllers/transaction.controller.js";

const router = new Router();

router.post("/borrow/:bookId", verifyJWT, borrowBook);
router.post("/return/:bookId", verifyJWT, returnBook);
router.get("/fetch-borrowedBooks/", verifyJWT, getBorrowedBooks);

export default router;
