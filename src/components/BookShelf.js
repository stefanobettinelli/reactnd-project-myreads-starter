import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookShelf = ({shelf, books, changeShelf}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map(book =>
              <li key={book.id}>
                <Book book={book} changeShelf={changeShelf}/>
              </li>
            )
          }
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelf: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
};

export default BookShelf;
