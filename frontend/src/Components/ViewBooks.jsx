import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import BooksList from "../Pages/Books/BookList";
import SearchBooks from "./SearchBooks";

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
      <SearchBooks onSearchResults={setBooks}/>
{}
      <BooksList books={books} />
    </div>
  );
};

export default ViewBooks;
