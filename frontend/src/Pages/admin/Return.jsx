import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";

const Return = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axiosInstance.get(
          "transactions/fetch-all-borrowedBooks"
        );
        // console.log(response);

        setBorrowedBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (bookId, userId) => {
    try {
      // console.log(bookId, userId);

      await axiosInstance.post(`/transactions/return`, {
        userId,
        bookId,
      });
      setBorrowedBooks(borrowedBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <div className=" p-8">
      <h2 className="text-3xl font-bold mb-4">Borrowed Books</h2>
      <table className="min-w-full bg-white">
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
            <tr key={transaction._id} className="border-b">
              <td className="py-2 px-4">{transaction.book.title}</td>
              <td className="py-2 px-4">
                {transaction?.book?.borrower?.fullname}
              </td>
              <td className="py-2 px-4">
                {new Date(transaction.borrowDate).toDateString()}
              </td>
              <td className="py-2 px-4">
                {new Date(transaction.returnDate).toDateString()}
              </td>
              <td className="py-2 px-4">{transaction.fine}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() =>
                    handleReturn(
                      transaction.book._id,
                      transaction?.book?.borrower?._id
                    )
                  }
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
                >
                  Return
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Return;
