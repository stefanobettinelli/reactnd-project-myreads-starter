import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';

class Book extends Component {
  state = {
    shelf: 'none'
  };

  componentDidMount() {
    BooksAPI.get(this.props.book.id).then(book => this.setState({shelf: book.shelf}));
  }

  render() {
    const {title, authors, imageLinks} = this.props.book;
    const moveTo = this.props.moveTo;
    const style = {
      width: 128,
      height: 193,
      backgroundImage: `url(${imageLinks && imageLinks.thumbnail})`
    };
    let shelf = this.props.book.shelf;
    if (this.state.shelf !== 'none') {
      shelf = this.state.shelf;
    }
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={style}/>
          <div className="book-shelf-changer">
            <select value={shelf || 'default'} onChange={(e) => moveTo(this.props.book, this.state.shelf, e.target.value)}>
              <option value="default" disabled>Move to...</option>
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
  }
}

export default Book;