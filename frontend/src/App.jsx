import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import ManageBooks from "./Pages/admin/ManageBooks";
import ViewMembers from "./Pages/admin/ViewMembers";
import ViewBooks from "./Components/ViewBooks";
// import BorrowHistory from './Pages/member/BorrowHistory';
import Sidebar from "./Components/Sidebar";
import Return from "./Pages/admin/Return";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import AddBook from "./Pages/Books/AddBook";
import Borrow from "./Pages/admin/Borrow";
import GetMembers from "./Pages/admin/GetMembers";
import Transaction from "./Pages/member/Transaction";

const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const role = localStorage.getItem("role");
  

  return (
    <>
      <div className="">
        {!isAuthPage && role === "admin" && <Sidebar />}
        {!isAuthPage && role === "member" && <Navbar role={role} />}
        <div
          className={`flex-1 ${!isAuthPage && role === "admin" ? "ml-64" : ""}`}
        >
          {/* Add margin-left if sidebar is present */}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ViewBooks />} />
            <Route path="/profile" element={<Profile />} />
            {role === "admin" && (
              <>
                <Route path="/admin/manage-books" element={<ManageBooks />} />
                <Route path="/admin/borrow" element={<Borrow />} />

                <Route path="/admin/add-book" element={<AddBook />} />
                <Route path="/admin/get-member" element={<GetMembers />} />

                <Route path="/admin/return" element={<Return />} />
              </>
            )}

            <Route path="/view-books" element={<ViewBooks />} />
            <Route path="/member/transactions" element={<Transaction />} />
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
