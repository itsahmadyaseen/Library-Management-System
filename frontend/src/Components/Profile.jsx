import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const Profile = () => {
  const [user, setUser] = useState(null); // Default to null for better conditional rendering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/users/profile");
        setUser(response.data.data);
      } catch (error) {
        console.log("Error fetching profile:", error);
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  if (!user) return <p>No user data found</p>; // Handle case where user data is not available

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="text-left align-middle p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p className="text-black text-lg mb-2">
          <strong>Name :</strong> {user.fullname || "N/A"}
        </p>
        <p className="text-lg mb-2">
          <strong>Username:</strong> {user.username || "N/A"}
        </p>
        <p className="  text-lg mb-2">
          <strong>Email:</strong> {user.email || "N/A"}
        </p>
        <p className=" text-lg mb-2">
          <strong>Role:</strong> {user.role || "N/A"}
        </p>
      </div>
      <div>
        <div>
          <h1 className="text-2xl">Borrowed Books</h1>
          {user.borrowedBooks && user.borrowedBooks.length > 0 ? (
            <table className="w-full mt-10 bg-gray-100 rounded-lg shadow-md">
              <thead>
                <tr className="w-full bg-gray-800 text-white">
                  <th className="text-left py-2 px-4">S.No</th>
                  <th className="text-left py-2 px-4">Title</th>
                  <th className="text-left py-2 px-4">Author</th>
                  <th className="text-left py-2 px-4">Genre</th>
                </tr>
              </thead>
              <tbody>
                {user.borrowedBooks.map((book, index) => (
                  <tr key={book._id}>
                    <td className="text-left py-2 px-4">{index + 1}</td>
                    <td className="text-left py-2 px-4">{book.title}</td>
                    <td className="text-left py-2 px-4">{book.author}</td>
                    <td className="text-left py-2 px-4">{book.genre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Borrowed Books</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
