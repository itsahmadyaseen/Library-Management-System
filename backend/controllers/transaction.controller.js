import Book from "../models/book.model.js";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const borrowBook = async (req, res) => {
  const userId = req.body.userId;
  const bookId = req.body.bookId;

  const today = new Date();
  const returnDate = new Date(today);
  returnDate.setDate(returnDate.getDate() + 10);
  const formattedReturnDate = returnDate.toISOString().split("T")[0];

  try {
    const bookDetails = await Book.findById(bookId).select("status");
    if (bookDetails.status === "borrowed") {
      console.log("Book is not available :", bookDetails.status);
      return res.status(400).json({
        message: "Book is not available",
        data: null,
        status: "borrowed",
      });
    }

    const newBorrow = new Transaction({
      user: userId,
      book: bookId,
      returnDate: formattedReturnDate,
      status: "borrowed",
    });

    await newBorrow.save();

    await Book.findByIdAndUpdate(bookId, {
      status: "borrowed",
      borrower: userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        borrowedBooks: bookId,
      },
    });

    console.log("Book borrowed :", newBorrow);
    return res.status(201).json({ message: "Book borrowed", data: newBorrow });
  } catch (error) {
    console.log("Error borrowing book :", error);
    return res
      .status(500)
      .json({ message: "Error borrowing book :", data: error });
  }
};

export const returnBook = async (req, res) => {
  const userId = req.body.userId;
  const bookId = req.body.bookId;
  console.log(bookId);
  console.log(userId);

  try {
    const bookDetails = await Book.findById(bookId).select("status");
    if (!bookDetails) {
      console.log("Book is not available ");
      return res.status(404).json({ message: "Book is not available " });
    }
    // if (bookDetails.status === "available") {
    //   console.log("Book is already available :", bookDetails.status);
    //   return res
    //     .status(400)
    //     .json({ message: "Book is already available :", data: null });
    // }

    await Transaction.findOneAndUpdate(
      { user: userId, book: bookId, status: "borrowed" },
      { status: "returned" }
    );

    await Book.findByIdAndUpdate(bookId, { status: "available" });

    await User.findByIdAndUpdate(userId, {
      $pull: {
        borrowedBooks: bookId,
      },
    });

    console.log("Book Returned ");
    return res.status(200).json({ message: "Book returned ", data: null });
  } catch (error) {
    console.log("Error returning book :", error);
    return res
      .status(500)
      .json({ message: "Error returning book :", data: error });
  }
};

export const getBorrowedBooks = async (req, res) => {
  try {
    const books = await Transaction.find({ user: req.user.id }).populate(
      "book"
    );

    console.log("Fetched borrowed books:", books);
    return res
      .status(200)
      .json({ message: "Fetched borrowed books :", data: books });
  } catch (error) {
    console.log("Error fething borrowed book :", error);
    return res
      .status(500)
      .json({ message: "Error fething borrowed book :", data: error });
  }
};

export const getAllBorrowedBooks = async (req, res) => {
  try {
    const books = await Transaction.find({ status: "borrowed" })
      .populate("book")
      .populate({
        path: "book",
        populate: {
          path: "borrower",
          model: "User",
          select: "fullname",
        },
      });

    console.log("Fetched all borrowed books:", books);
    return res
      .status(200)
      .json({ message: "Fetched all borrowed books :", data: books });
  } catch (error) {
    console.log("Error fething borrowed book :", error);
    return res
      .status(500)
      .json({ message: "Error fething borrowed book :", data: error });
  }
};

export const transactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ updatedAt: -1 })
      .populate({
        path: "user",
        select: "fullname",
      })
      .populate({
        path: "book",
        select: "title",
      });
    console.log("Fetched transactions : ", transactions);
    return res
      .status(200)
      .json({ message: "Fetched Transactions :", data: transactions });
  } catch (error) {
    console.log("Error fething transactions :", error);
    return res
      .status(500)
      .json({ message: "Error fething transactions :", data: error });
  }
};
