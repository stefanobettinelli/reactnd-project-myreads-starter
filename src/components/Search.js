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
    this.setState({query: query.trim()});
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
          if (books.length > 0) {
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
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.books.length > 0 &&
              this.state.books.map(book =>
                <li key={book.id}>
                  <Book book={book} moveTo={this.props.moveTo}/>
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