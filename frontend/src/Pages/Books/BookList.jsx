/* eslint-disable react/prop-types */
import React from 'react';
import BookCard from './BookCard';

const BooksList = ({ books }) => {
  return (
    <div className="container mx-auto  py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Books</h2>
      <div className="flex flex-wrap justify-center">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksList;
