import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";

const Borrow = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [alreadyBorrowed, setAlreadyBorrowed] = useState(false);


  useEffect(() => {
    const fetchBooksAndUsers = async () => {
      try {
        const [booksResponse, usersResponse] = await Promise.all([
          axiosInstance.get("/books/fetch-books"),
          axiosInstance.get("/users/fetch-all-users"),
        ]);
+
        setBooks(booksResponse.data.data);
        setUsers(usersResponse.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchBooksAndUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/transactions/borrow", {
        bookId: selectedBook,
        userId: selectedUser,
      });
      if(response.data.status === 'borrowed'){
        setAlreadyBorrowed(true);
      }
      console.log(response);
      
      console.log("Borrowed book:", response.data);

      setSelectedBook('');
      setSelectedUser('');

    } catch (error) {
      console.log("Error borrowing book:", error);
    }
  };

  return (
    <div className="flex flex-col min-w-full items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4">Borrow Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Select Book</label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="">Select a book</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Select User</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullname}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Borrow Book
          </button>
        </form>
      </div>
      {alreadyBorrowed && (
        <div className="text-2xl border-4 border-red-500 ">
            <h2>Alert: Book was already borrowed by someone</h2>
        </div>
      )}
    </div>
  );
};

export default Borrow;
