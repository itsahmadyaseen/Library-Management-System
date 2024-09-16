/* eslint-disable react/prop-types */
import BookCard from './BookCard';

const BooksList = ({ books }) => {
  return (
    <div className="container mx-auto  py-8">
      <div className="flex flex-wrap justify-center">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksList;
