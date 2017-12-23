import React from 'react';

const Book = (props) => {
  const {title, authors, imageLinks, shelf} = props.book;
  const moveTo = props.moveTo;

  const style = {
    width: 128,
    height: 193,
    backgroundImage: `url(${imageLinks.thumbnail})`
  };

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={style}/>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={(e) => moveTo(props.book, e.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading" disabled={shelf === 'currentlyReading'}>Currently Reading</option>
            <option value="wantToRead" disabled={shelf === 'wantToRead'}>Want to Read</option>
            <option value="read" disabled={shelf === 'read'}>Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
};

export default Book;