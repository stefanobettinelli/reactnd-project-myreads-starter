import React from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelf from './components/BookShelf';
import './App.css';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    showSearchPage: false
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
        wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
        read: books.filter((book) => book.shelf === 'read')
      });
    });
  }

  moveTo = (book, targetShelf) => {
    BooksAPI.update(book, targetShelf);
    const currShelf = book.shelf;
    book.shelf = targetShelf;
    console.log(`move book id ${book.id} to shelf ${targetShelf}`);
    this.setState(
      {
        [currShelf] : this.state[currShelf].filter(b => b.id !== book.id),
        [targetShelf] : this.state[targetShelf].concat([book])
      }
    );
  };

  render() {
    return (
      <div className="app">
        {console.log(this.state)}
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"/>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfName='Currently Reading' bookList={this.state.currentlyReading} moveTo={this.moveTo}/>
                <BookShelf shelfName='Want to Read' bookList={this.state.wantToRead} moveTo={this.moveTo}/>
                <BookShelf shelfName='Read' bookList={this.state.read} moveTo={this.moveTo}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
