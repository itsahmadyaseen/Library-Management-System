import Book from "../models/book.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    console.log("Books fetched");
    return res.status(200).json({ message: "Books fetched", data: books });
  } catch (error) {
    console.log("Error fething books:", error);
    return res
      .status(200)
      .json({ message: "Error fetching books", data: error });
  }
};

export const addBook = async (req, res) => {
  const { title, author, genre, publicationDate } = req.body;

  try {
    // console.log(req.file);
    const coverImageLocalPath = req.file?.path;
    if (!coverImageLocalPath) {
      console.log("Cannot get local file path");
      return res.status(400).json({
        message: "Cannot get local file path",
        data: null,
      });
    }

    const coverImagePath = await UploadOnCloudinary(coverImageLocalPath);
    if (!coverImagePath) {
      console.log("Cannot get cloudinary file path");
      return res.status(400).json({
        message: "Cannot get cloudinary file path",
      });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      publicationDate,
      coverImage: coverImagePath,
    });

    await newBook.save();
    console.log("Book added");
    res.status(201).json({ message: "Book added" });
  } catch (error) {
    console.log("Unable to add book", error);
    res.status(500).json({ message: "Unable to add book", data: error });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const bookDetails = await Book.findById(bookId);

    if (!bookDetails) {
      console.log("Cannot find book");
      return res.status(404).json({ message: "Cannot find book" });
    }

    if (bookDetails.imagePublicId) {
      const deleteImageResult = await deleteOnCloudinary(
        bookDetails.imagePublicId
      );
      if (deleteImageResult.result !== "ok") {
        console.log("Failed to delete image on Cloudinary");
        return res.status(500).json({
          message: "Failed to delete image on Cloudinary",
        });
      }
    }

    await Book.findByIdAndDelete(bookId);
    console.log("Book deleted");
    return res.status(200).json({ message: "Book Deleted" });
  } catch (error) {
    console.log("Unable to delete Book", error);
    return resBook
      .status(500)
      .json({ message: "Unable to delete Book", data: error });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title, author, genre, publicationDate } = req.body;

    console.log(" all details", {
      bookId,
      title,
      genre,
      author,
      publicationDate,
    });

    const bookDetails = await Book.findById(bookId);
    if (!bookDetails) {
      console.log("Book not found");
      return res.status(404).json({ message: "Book not found" });
    }

    let coverImagePath;
    if (req.file) {
      const coverImageLocalPath = req.file.path;
      if (!coverImageLocalPath) {
        console.log("Cannot get local file path", coverImageLocalPath);
        return res.status(400).json({
          message: "Cannot get local file path",
          data: coverImageLocalPath,
        });
      }

      coverImagePath = await UploadOnCloudinary(coverImageLocalPath);
      if (!coverImagePath) {
        console.log("Cannot get coverImage path from Cloudinary");
        return res.status(500).json({ message: "Thumbnail upload failed" });
      }
    }

    const updatedBookData = {
      title,
      genre,
      author,
      coverImage: coverImagePath,
      publicationDate,
    };

    const response = await Book.findByIdAndUpdate(
      bookId,
      { $set: updatedBookData },
      { new: true }
    );

    if (!response) {
      console.log("Book update failed");
      return res.status(500).json({ message: "Book update failed" });
    }

    console.log("Book updated");
    return res.status(200).json({ message: "Book updated" });
  } catch (error) {
    console.error("Book updation failed", error);
    return res
      .status(500)
      .json({ message: "Book updation failed", data: error });
  }
};

export const getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const getBook = await Blog.findById(id);
    if (!getBook) {
      console.log("Book fetch failed ");
      return res.status(404).json({ message: "Book fetch failed" });
    }
    console.log("Book fetched");
    return res.status(200).json({ data: getBook, userId: req.user.id });
  } catch (error) {
    console.log("Book fetch failed ", error);
    return res
      .status(500)
      .json({ message: "Error fetching books", data: error });
  }
};

export const searchBooks = async (req, res) => {
  const { title, genre, author } = req.body;

  try {
    const query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };
    if (genre) query.genre = genre;

    const books = await Book.find(query);
    console.log("Search result fetched");
    return res.status(200).json({ message: "Books fetched", data: books });
  } catch (error) {
    console.log("Error fetching books", error);
    return res
      .status(500)
      .json({ message: "Error fetching books", data: error });
  }
};
