import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import PropTypes from 'prop-types';

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative max-w-xs w-full group">
      {/* Favorite Button */}
      <button
        className="absolute top-2 right-2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 z-10"
        onClick={() => onToggleFavorite(book.id)}
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      >
        {isFavorite ? (
          <AiFillHeart className="text-red-500 text-xl" />
        ) : (
          <AiOutlineHeart className="text-gray-500 text-xl" />
        )}
      </button>

      <Link to={`/books/${book.id}`} className="flex flex-col h-full group-hover:block">
        {/* Book Thumbnail with Aspect Ratio */}
        <div className="relative w-full bg-gray-200 flex items-center justify-center mb-3">
          <div className="w-full aspect-w-2 aspect-h-3">
            <img
              src={book.thumbnail}
              alt={`${book.title} cover`}
              className="object-cover rounded-t-lg w-full h-full transition-transform duration-300 transform group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Book Info Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300 flex flex-col justify-end p-4">
            {/* Book Title */}
            <h3 className="text-lg font-semibold text-white mb-2 flex-grow hover:text-blue-600 transition duration-200">
              {book.title.length > 60 ? `${book.title.substring(0, 57)}...` : book.title}
            </h3>

            {/* Authors */}
            <p className="text-xs text-gray-300 mb-2">
              {book.authors.length > 2
                ? `${book.authors.slice(0, 2).join(', ')}, ...`
                : book.authors.join(', ')}
            </p>

            {/* Description */}
            <p className="text-sm text-gray-200 mb-4 line-clamp-2">
              {book.description.length > 150
                ? `${book.description.substring(0, 147)}...`
                : book.description}
            </p>

            {/* View Details Link */}
            <p className="text-sm text-blue-600 font-medium hover:underline mt-auto">View Details</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

// PropTypes for type checking
BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default BookCard;
