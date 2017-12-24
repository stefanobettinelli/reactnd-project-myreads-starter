import React from 'react';

const Book = (props) => {
  const {title, authors, imageLinks, shelf} = props.book;
  const changeShelf = props.changeShelf;
  const style = {
    width: 128,
    height: 193,
    backgroundImage: `url(${imageLinks && (imageLinks.thumbnail || imageLinks.smallThumbnail)})`
  };
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={style}/>
        <div className="book-shelf-changer">
          <select value={shelf || 'default'}
                  onChange={(e) => changeShelf(props.book, e.target.value)}>
            <option value="default" disabled>Move to...</option>
            <option value="currentlyReading" disabled={shelf === 'currentlyReading'}>Currently Reading</option>
            <option value="wantToRead" disabled={shelf === 'wantToRead'}>Want to Read</option>
            <option value="read" disabled={shelf === 'read'}>Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authors && authors.map((auth, ind) => <div key={ind} className="book-authors">{auth}</div>)}
    </div>
  );
};

export default Book;