/* eslint-disable react/prop-types */

const BookCard = ({ book }) => {
  return (
    <div className="min-w-52  rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 m-4">
      <img
        className="w-full h-48 object-fill"
        src={book.coverImage || "https://via.placeholder.com/150"}
        alt={`${book.title} cover`}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book.title}</div>
        <p className="text-gray-700 text-base">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Publication Date:</strong> {new Date(book.publicationDate).getFullYear()}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Status:</strong> {book.status}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
