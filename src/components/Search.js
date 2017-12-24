import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
  state = {
    query: '',
    books: []
  };

  updateQuery = (query) => {
    const idToBookObj = this.props.idToBookObj;
    this.setState({query: query.trim()});
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
          if (books.length > 0) {
            books.forEach(book => {
              idToBookObj[book.id] && (book.shelf = idToBookObj[book.id].shelf);
            });
            this.setState({books});
          }
        }
      );
    } else {
      this.setState({books: []});
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text" placeholder="Search by title or author"
              value={this.state.query} onChange={(e) => this.updateQuery(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.books.map(book =>
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

export default Search;