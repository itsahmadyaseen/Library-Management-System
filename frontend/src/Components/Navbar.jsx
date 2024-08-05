
import { Link } from 'react-router-dom';

const Navbar = ({ role }) => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Library Management System</h1>
        <div>
          <Link className="mr-4" to="/">Home</Link>
          {role === 'admin' && (
            <>
              <Link className="mr-4" to="/admin/manage-books">Manage Books</Link>
              <Link className="mr-4" to="/admin/members">View Members</Link>
            </>
          )}
          {role === 'member' && (
            <>
              <Link className="mr-4" to="/member/books">View Books</Link>
              <Link className="mr-4" to="/member/history">Borrow History</Link>
            </>
          )}
          <Link to="/logout">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
