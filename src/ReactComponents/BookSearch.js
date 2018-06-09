import React, { Component } from 'react'
import Book from './Books.js'
import * as BooksAPI from '../BooksAPI'
import {Link} from 'react-router-dom'


class BookSearch extends Component {

state = {
            query:'',
            booksFound:[]
}


updateQuery = (query) => {
  this.setState({query:query.trim()})

  if (this.state.query){

    BooksAPI.search(query).then((books)=>{
if (books.length>0){
      this.setState({booksFound: books})}

      else {

        this.setState({booksFound: [], query: ''})
      }
  } )
  }
}

render(){

return (

          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to ="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value = {this.state.query} onChange = {(event) => this.updateQuery(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">

              {this.state.booksFound.map((book)=>(
                <Book book={book} title={book.title} books = {this.props.books} img={book.imageLinks.thumbnail} key = {book.id} shelfChange={this.props.shelfChange}/>))}

              </ol>
            </div>
          </div>

      )
  }
}


export default BookSearch




///// updateQuery = (query) => {
///  this.setState({query:query.trim()})

////  if (this.state.query){

 ///   BooksAPI.search(query).then((books)=>{
///if (books.length>0){
 ///     this.setState({booksFound: books})}

 ///     else {

  ///      this.setState({booksFound: []})
 //     }
 /// } )
 /// }
//}