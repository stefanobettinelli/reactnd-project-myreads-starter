import React from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelf from './components/BookShelf';
import Search from './components/Search';
import {Link, Route} from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
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
    if (currShelf) {
      this.setState(
        {
          [currShelf]: this.state[currShelf].filter(b => b.id !== book.id),
          [targetShelf]: this.state[targetShelf].concat([book])
        }
      );
    } else {
      this.setState(
        {
          [targetShelf]: this.state[targetShelf].concat([book])
        }
      );
    }
  };

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (<Search moveTo={this.moveTo}/>)}/>

        <Route exact path='/' render={() => (
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
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
