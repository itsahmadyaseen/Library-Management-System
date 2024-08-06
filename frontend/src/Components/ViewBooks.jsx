import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import BooksList from "../Pages/Books/BookList";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/books/fetch-books");
        console.log(response.data);
        setBooks(response.data.data);
      } catch (error) {
        console.log("Error Fetching books", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <BooksList books={books} />
    </div>
  );
};

export default ViewBooks;
