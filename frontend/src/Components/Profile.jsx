import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const Profile = () => {
  const [user, setUser] = useState(null); // Default to null for better conditional rendering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/users/profile");
        console.log("Profile data:", response.data);
        setUser(response.data);
        console.log('user',user);
        
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
    <div className="bg-green-200">
      <h2>My Profile</h2>
      <p className="text-black text-3xl">
        <strong>Username:</strong> {user.username || 'N/A'}
      </p>
      <p>
        <strong>Full Name:</strong> {user.fullname || 'N/A'}
      </p>
      <p>
        <strong>Email:</strong> {user.email || 'N/A'}
      </p>
      <p>
        <strong>Role:</strong> {user.role || 'N/A'}
      </p>
    </div>
  );
};

export default Profile;
