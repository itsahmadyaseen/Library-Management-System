import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const Navbar = ({ role }) => {
  const username = localStorage.getItem("username");
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      console.log("User logged out");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  return (
    <nav className="bg-purple-700 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div className="flex">
        <h1 className="text-xl font-bold">Library Management System</h1>
        <h1 className="text-xl ml-4 font-semibold">{username}</h1>

        </div>

        <div>
          
          <>
            <Link className="mr-4" to="/profile">
              Profile
            </Link>
            <Link className="mr-4" to="/view-books">
              View Books
            </Link>
            <Link className="mr-4" to="/member/transactions">
              Transactions
            </Link>
          </>

          <Link
            onClick={() => {
              handleLogout();
            }}
            to="/login"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
