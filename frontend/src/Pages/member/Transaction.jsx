import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";

const Transaction = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const transactionHistory = async () => {
      try {
        const response = await axiosInstance.get("/transactions/fetch-borrowedBooks");
        console.log(response.data);
        setTransactionHistory(response.data.data);
      } catch (error) {
        console.log("Error fetching transaction history", error);
      }
    };
    transactionHistory();
  }, []);

  return (
    <div>
      <div className="w-full max-w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4">Recent Transactions</h1>
        <table className="w-full bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-800 text-white">
              <th className="text-left py-2 px-4">S.No</th>
              <th className="text-left py-2 px-4">Book Title</th>
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
  );
};
export default Transaction;
