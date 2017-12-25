import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    query: '',
    books: []
  };

  updateQuery = (query) => {
    const idToBookObj = this.props.idToBookObj;
    this.setState({query: query.trim()});

    query ?
      BooksAPI.search(query).then(books => {
        if (books.length) {
          books.forEach(book => idToBookObj[book.id] && (book.shelf = idToBookObj[book.id].shelf));
          this.setState({books});
        }
      })
      :
      this.setState({books: []});
  };

  render() {
    const {books, query} = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text" placeholder="Search by title or author"
              value={query} onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.map(book =>
                <li key={book.id}>
                  <Book book={book} changeShelf={this.props.changeShelf}/>
                </li>
              )
            }
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  idToBookObj: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired
};

export default Search;
