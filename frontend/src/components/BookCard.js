// src/components/BookCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="border rounded shadow hover:shadow-lg transition duration-200">
      <Link to={`/book/${book.id}`}>
        <img src={book.thumbnail} alt={book.title} className="w-full h-64 object-cover rounded-t" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
          <p className="text-gray-600 mb-2">{book.authors.join(', ')}</p>
          <p className="text-gray-700 text-sm line-clamp-3">{book.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
