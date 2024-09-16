import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import AlertBox from "../../Components/AlertBox";

const Borrow = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [alreadyBorrowed, setAlreadyBorrowed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchBooksAndUsers = async () => {
      try {
        const [booksResponse, usersResponse] = await Promise.all([
          axiosInstance.get("/books/fetch-books"),
          axiosInstance.get("/users/fetch-all-users"),
        ]);
        setBooks(booksResponse.data.data);
        setUsers(usersResponse.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    const transactionHistory = async () => {
      try {
        const response = await axiosInstance.get("/transactions/history");
        console.log(response.data);
        setTransactionHistory(response.data.data);
      } catch (error) {
        console.log("Error fetching transaction history", error);
      }
    };

    transactionHistory();
    fetchBooksAndUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/transactions/borrow", {
        bookId: selectedBook,
        userId: selectedUser,
      });
      // console.log("response", response);

      if (response && response.data) {
        setShowAlert(true);

        console.log("Borrowed book:", response.data);
        setSelectedBook("");
        setSelectedUser("");
      }
      setAlreadyBorrowed(false);
    } catch (error) {
      // console.log("error : ", error);

      if (error.response.status === 400) {
        setAlreadyBorrowed(true);
      } else {
        console.error("Error borrowing book:", error.response.data);
      }
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
          <AlertBox message="Book Borrowed!" showAlert={showAlert} />
   
        </form>
      </div>
      <div>
        {alreadyBorrowed && (
          <div className="text-2xl border-4 border-red-500 ">
            <h2>Alert: Book was already borrowed by someone</h2>
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="w-full min-w-full bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-2xl font-bold mb-4">Recent Transactions</h1>
          <table className="w-full bg-gray-100 rounded-lg shadow-md">
            <thead>
              <tr className="w-full bg-gray-800 text-white">
                <th className="text-left py-2 px-4">S.No</th>
                <th className="text-left py-2 px-4">Book Title</th>
                <th className="text-left py-2 px-4">Member</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Borrow Data</th>
                <th className="text-left py-2 px-4">Return Data</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td className="text-left py-2 px-4">{index + 1}</td>
                  <td className="text-left py-2 px-4">
                    {transaction.book.title}
                  </td>
                  <td className="text-left py-2 px-4">
                    {transaction.user.fullname}
                  </td>
                  <td className="text-left py-2 px-4">{transaction.status}</td>
                  <td className="text-left py-2 px-4">
                    {new Date(transaction.borrowDate).toDateString()}
                  </td>
                  <td className="text-left py-2 px-4">
                    {new Date(transaction.returnDate).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Borrow;
