import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ManageBooks from "./Pages/admin/ManageBooks";
import ViewMembers from "./Pages/admin/ViewMembers";
// import ViewBooks from './Pages/member/ViewBooks';
// import BorrowHistory from './Pages/member/BorrowHistory';
import Sidebar from "./Components/Sidebar";
import Return from "./Pages/admin/Return";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import AddBook from "./Pages/Books/AddBook";
import Borrow from "./Pages/admin/Borrow";
import GetMembers from "./Pages/admin/GetMembers";

const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const role = "admin"; // Update this logic if necessary

  return (
    <>
    <div className="flex">
      {!isAuthPage && role === "admin" && <Sidebar />}
      {/* <Navbar role={role} /> */}
      <div className={`flex-1 ${!isAuthPage && role === "admin" ? 'ml-64' : ''}`}>
          {/* Add margin-left if sidebar is present */}
         
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/manage-books" element={<ManageBooks />} />
        <Route path="/admin/borrow" element={<Borrow />} />
        <Route path="/admin/add-book" element={<AddBook />} />
        <Route path="/admin/get-member" element={<GetMembers />} />
        {/* <Route path="/member/books" element={<ViewBooks />} />
        <Route path="/member/history" element={<BorrowHistory />} /> */}
        <Route path="/admin/return" element={<Return />} />
      </Routes>
      </div>
    </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
