import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import ManageBooks from "./Pages/admin/ManageBooks";
// import ViewMembers from "./Pages/admin/ViewMembers";
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
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const role = localStorage.getItem("role");

  return (
    <>
      <div className="relative">
        {!isAuthPage && role === "admin" && <Sidebar />}
        {!isAuthPage && role === "member" && <Navbar role={role} />}
        <div
          className={`flex-1 ${
            !isAuthPage && role === "admin" ? "ml-32" : ""
          }  transition-all duration-300 ease-in-out`}
        >
          {/* Add margin-left if sidebar is present */}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ViewBooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            {role === "admin" && (
              <>
                <Route
                  path="/admin/manage-books"
                  element={
                    <ProtectedRoute>
                      <ManageBooks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/borrow"
                  element={
                    <ProtectedRoute>
                      <Borrow />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/add-book"
                  element={
                    <ProtectedRoute>
                      <AddBook />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/get-member"
                  element={
                    <ProtectedRoute>
                      <GetMembers />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/return"
                  element={
                    <ProtectedRoute>
                      <Return />
                    </ProtectedRoute>
                  }
                />
              </>
            )}

            <Route
              path="/view-books"
              element={
                <ProtectedRoute>
                  <ViewBooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/member/transactions"
              element={
                <ProtectedRoute>
                  <Transaction />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
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
