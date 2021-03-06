import React from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelf from './components/BookShelf';
import Search from './components/Search';
import {Link, Route} from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    idToBookObj: {}
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const map = {};
      books.forEach(book => map[book.id] = book);
      this.setState({idToBookObj: map});
    });
  }

  changeShelf = (book, targetShelf) => {
    BooksAPI.update(book, targetShelf).then(() => {
      book.shelf = targetShelf;
      const map = this.state.idToBookObj;
      map[book.id] = book;
      this.setState({
        idToBookObj: map
      });
    })
  };

  getShelvesBookList = () => {
    const idToBookObj = this.state.idToBookObj;
    const shelves = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
    Object.keys(idToBookObj).forEach((id) => {
      const shelf = idToBookObj[id].shelf;
      const book = idToBookObj[id];
      shelf !== 'none' && shelves[shelf].push(book);
    });
    return shelves;
  };

  render() {
    const {currentlyReading, wantToRead, read} = this.getShelvesBookList();
    return (
      <div className="app">
        <Route path='/search' render={() =>
          (<Search changeShelf={this.changeShelf} idToBookObj={this.state.idToBookObj}/>)}
        />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelf='Currently Reading' books={currentlyReading} changeShelf={this.changeShelf}/>
                <BookShelf shelf='Want to Read' books={wantToRead} changeShelf={this.changeShelf}/>
                <BookShelf shelf='Read' books={read} changeShelf={this.changeShelf}/>
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
