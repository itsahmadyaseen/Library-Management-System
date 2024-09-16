// src/components/Sidebar.js
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { FiSidebar } from "react-icons/fi";
import { useState } from "react";


const Sidebar = () => {
  const {isOpen, setIsOpen}  = useState();
  const navigate = useNavigate();
  const username = localStorage.getItem('username')
  const handleLogout = async () => {
    try {

      await axiosInstance.post("/users/logout");
      console.log("User logged out");

      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      navigate('/login');
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar
  };

  return (
    <>
      <FiSidebar
        onClick={toggleSidebar}
        className="sm:hidden p-1 h-10 w-16  text-black cursor-pointer top-4 left-1 z-50 rounded-sm"
      >
        {isOpen ? "Close" : "Menu"}
      </FiSidebar>
      <div className="flex sm:block">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-purple-900 text-white p-5 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out sm:translate-x-0`}
        >
          <h2 className="text-2xl font-bold mt-12 sm:mt-4">Sidebar</h2>
          <h1 className="mt-2">{username}</h1>
          <ul className="mt-5 space-y-2">
            <li>
              <button
                onClick={() => navigate("/")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/manage-books")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Book Details
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/add-book")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Add Book
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/borrow")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Borrow
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/get-member")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Get Member
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/return")}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Return
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLogout()}
                className="hover:bg-indigo-900 w-full text-left p-2 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
