import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import "../../App.css";

const GetMembers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users/fetch-all-users");
        setUsers(response.data.data);
      } catch (error) {
        console.log("Error fetching members", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col sm:ml-64 items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-full bg-white rounded-lg shadow-md p-8 mb-6">
        <h1 className="text-3xl font-bold mb-4 mt-8">Members</h1>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full  rounded-lg shadow-md">
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
                  <td className="text-left py-2 px-4">{user.role}</td>
                  <td className="text-left py-2 px-4">
                    {user.borrowedBooks?.length}
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

export default GetMembers;
