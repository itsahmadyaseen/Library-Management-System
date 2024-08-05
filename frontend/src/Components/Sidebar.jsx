// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-purple-900 text-white fixed p-6 text-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">LMS</h1>
      </div>
      <ul>
        <li className="mb-3 p-1 hover:border rounded-sm border-black  hover:bg-purple-700">
          <Link to="/profile" className="">Profile</Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-sm border-black  hover:bg-purple-700">
          <Link to="/admin/add-book" className="">Add Book</Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-sm border-blac  hover:bg-purple-700">
          <Link to="/admin/add-transaction" className="">Add Transaction</Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-sm border-black  hover:bg-purple-700">
          <Link to="/admin/get-member" className="">Get Member</Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-sm border-black  hover:bg-purple-700">
          <Link to="/admin/add-member" className="">Add Member</Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-sm border-black  hover:bg-purple-700">
          <Link to="/admin/return" className="">Return</Link>
        </li>
        <li className="mb-3 p-1 hover:border rounded-sm border-black  hover:bg-purple-700">
          <Link to="/logout" className="">Log out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
