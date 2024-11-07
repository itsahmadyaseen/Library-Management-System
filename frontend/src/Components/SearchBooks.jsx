/* eslint-disable react/prop-types */
import { useState } from "react"; // Ensure this points to your axios instance
import axiosInstance from "../../axiosInstance";

const SearchBooks = ({ onSearchResults }) => {
  const [title, setTitle] = useState("");
  //   const [author, setAuthor] = useState('');
  //   const [genre, setGenre] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/books/search", { title });

      onSearchResults(response.data.data);
    } catch (error) {
      console.error("Error searching books", error);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-center  items-center p-4"
    >
      <input
        type="text"
        placeholder="Search by Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 p-2 w-1/2 border rounded"
      />
      {/* <input
        type="text"
        placeholder="Search by Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Search by Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="mb-2 p-2 border rounded"
      /> */}
      <button
        type="submit"
        className="bg-blue-500 text-white ml-2 mb-1.5 py-2 px-4 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBooks;
