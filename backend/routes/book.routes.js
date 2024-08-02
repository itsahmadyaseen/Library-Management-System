import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  searchBooks,
  updateBook,
} from "../controllers/book.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/add-book",
  verifyJWT,
  roleMiddleware(["admin"]),
  upload.single("coverImage"),
  addBook
);
router.get("/fetch-books", verifyJWT, getAllBooks);
router.get("/fetch-book/:bookId", verifyJWT, getBookById);
router.get("/search", verifyJWT, searchBooks);
router.patch(
  "/update-book/:bookId",
  verifyJWT,
  roleMiddleware(["admin"]),
  upload.single("coverImage"),
  updateBook
);
router.delete(
  "/delete-book/:bookId",
  verifyJWT,
  roleMiddleware(["admin"]),
  deleteBook
);

export default router;
