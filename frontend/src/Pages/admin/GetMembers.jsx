import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";

const GetMembers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users/fetch-all-users");
        console.log(response.data);
        setUsers(response.data.data);
      } catch (error) {
        console.log("Error fetching members", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col min-w-full items-center min-h-screen bg-gray-100 p-4 ">
      <div className="w-full max-w-full bg-white rounded-lg shadow-md p-8 mb-6">
        <h1 className="text-2xl font-bold mb-4">Members</h1>
        <table className="w-full bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-800 text-white">
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Username</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Role</th>
              <th className="text-left py-2 px-4">Borrowed Books</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="text-left py-2 px-4">{user.fullname}</td>
                <td className="text-left py-2 px-4">{user.username}</td>
                <td className="text-left py-2 px-4">{user.email}</td>
                <td className="text-left py-2 px-4">
                  {user.role}
                </td>
                <td className="text-left py-2 px-4">{user.borrowedBooks?.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetMembers;
