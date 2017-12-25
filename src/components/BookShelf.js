import React from 'react';
import Book from './Book';

const BookShelf = ({shelfName, bookList, changeShelf}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            bookList.map(book =>
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

export default BookShelf;
