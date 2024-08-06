import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance"; // Your axios instance

const ManageBooks = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const [booksResponse, borrowedBooksResponse] = await Promise.all([
          axiosInstance.get("/books/fetch-books"), // Endpoint to fetch all books
          axiosInstance.get("/transactions/fetch-all-borrowedBooks") // Endpoint to fetch all borrowed books
        ]);
console.log(borrowedBooksResponse.data.data);

        setAvailableBooks(booksResponse.data.data);
        setBorrowedBooks(borrowedBooksResponse.data.data);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col min-w-full items-center min-h-screen bg-gray-100 p-4 ">
      <div className="w-full max-w-full bg-white rounded-lg shadow-md p-8 mb-6">
        <h1 className="text-2xl font-bold mb-4">Available Books</h1>
        <table className="w-full bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-800 text-white">
              <th className="text-left py-2 px-4">Book Name</th>
              <th className="text-left py-2 px-4">Author</th>
              <th className="text-left py-2 px-4">Genre</th>
              <th className="text-left py-2 px-4">Publication Date</th>
              <th className="text-left py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {availableBooks.map((book) => (
              <tr key={book._id}>
                <td className="text-left py-2 px-4">{book.title }</td>
                <td className="text-left py-2 px-4">{book.author}</td>
                <td className="text-left py-2 px-4">{book.genre}</td>
                <td className="text-left py-2 px-4">{new Date(book.publicationDate).toDateString()}</td>
                <td className="text-left py-2 px-4">{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4">Borrowed Books</h1>
        <table className="w-full bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-800 text-white">
              <th className="text-left py-2 px-4">Book Name</th>
              <th className="text-left py-2 px-4">Borrower Name</th>
              <th className="text-left py-2 px-4">From Date</th>
              <th className="text-left py-2 px-4">To Date</th>
              <th className="text-left py-2 px-4">Fine</th>
              <th className="text-left py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((transaction) => (
              <tr key={transaction._id}>
                <td className="text-left py-2 px-4">{transaction.book.title || 'N/A'}</td>
                <td className="text-left py-2 px-4">{transaction.book.borrower ? transaction.book.borrower.fullname : "N/A"}</td>
                <td className="text-left py-2 px-4">{new Date(transaction.borrowDate).toDateString() || 'N/A'}</td>
                <td className="text-left py-2 px-4">{new Date(transaction.returnDate).toDateString() || 'N/A'}</td>
                <td className="text-left py-2 px-4">{transaction.fine || "N/A"}</td>
                <td className="text-left py-2 px-4">
                  {/* Action buttons here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
