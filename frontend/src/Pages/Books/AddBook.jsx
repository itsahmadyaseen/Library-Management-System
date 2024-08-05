import React, { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    coverImage: null, // Store file here
    publicationDate: "",
    status: "available",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "coverImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    data.append("coverImage", formData.coverImage); // Append file here
    data.append("publicationDate", formData.publicationDate);
    data.append("status", formData.status);

    try {
      const response = await axiosInstance.post("/books/add-book", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Book added successfully:", response.data);
      navigate("/admin/manage-books");
    } catch (error) {
      console.log("Error adding book:", error);
    }
  };

  return (
    <div className="flex flex-col min-w-full items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Add New Book</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Publication Date</label>
            <input
              type="date"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
            >
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-950 rounded-md hover:bg-indigo-800 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
