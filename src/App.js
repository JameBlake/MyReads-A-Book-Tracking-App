import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './ReactComponents/Books.js'
import BookSearch from './ReactComponents/BookSearch.js'
import {Link} from 'react-router-dom'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
     books:[]
  }

componentDidMount(){
 BooksAPI.getAll().then((books) => {
   this.setState({books})
  })
}

shelfChange = ( updateBook, e ) => {

    BooksAPI.update(updateBook, e).then(() =>{
    console.log(e);
    updateBook.shelf =e

    let updatedBooks = this.state.books.filter( book => book.id !== updateBook.id )
    updatedBooks.push(updateBook);
    console.log(updatedBooks)
    this.setState({ books: updatedBooks })
})}

  render() {
    return (
      <div className="app">
            <Route exact path = "/Search" render = {() => (
              <BookSearch
              books = {this.state.books}
              shelfChange ={this.shelfChange}
              />
              )}/>

  <Route exact path ="/" render={() => (
                <div className="list-books">
 
                      <div className="list-books-title"><h1>MyReads</h1></div>

                          <div className="list-books-content">


                <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid"> {this.state.books.filter(book => book.shelf ==="currentlyReading").map(book=>(
                                    <Book book={book} title={book.title} img={book.imageLinks.thumbnail} key = {book.id} shelfChange={this.shelfChange}/>))}</ol>
                            </div>
                </div>



                <div className="bookshelf">
                          <h2 className="bookshelf-title">Want to Read</h2>
                              <div className="bookshelf-books">
                                  <ol className="books-grid"> {this.state.books.filter(book => book.shelf ==="wantToRead").map(book=>(
                                      <Book book={book} title={book.title} img={book.imageLinks.thumbnail} key = {book.id} shelfChange={this.shelfChange}/>))}</ol>
                            </div>
                </div>


                <div className="bookshelf">
                          <h2 className="bookshelf-title">Read</h2>
                              <div className="bookshelf-books">
                                  <ol className="books-grid"> {this.state.books.filter(book => book.shelf ==="read").map(book=>(
                                      <Book book={book} title={book.title} img={book.imageLinks.thumbnail} key = {book.id} shelfChange={this.shelfChange}/>))}</ol>
                            </div>

                           </div>

                      </div>

              </div>
)}/>
                  <div className="open-search">
                        <Link to ="/Search">Add a book</Link>
                  </div>

    </div>
    )
  }
}

export default BooksApp
