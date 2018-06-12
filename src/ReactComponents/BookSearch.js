import React, { Component } from 'react'
import Book from './Books.js'
import * as BooksAPI from '../BooksAPI'
import {Link} from 'react-router-dom'


class BookSearch extends Component {

    state = {
          query:'',
          booksFound:[]
}

updateQuery = (event) => {
    const query = event;
    if (query) {
      this.setState({query})
      BooksAPI.search(query).then( enquire => {
          if (enquire instanceof Array) {
            const found = enquire.filter(found => found.authors && found.imageLinks);
            this.setState({ booksFound: found });
            console.log(this.state.booksFound);
        } else {
          this.setState({ booksFound: [] })
        }
      })
        .catch()
    } else {
      this.setState({ booksFound: [], query:'' })
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

                          {this.state.query && this.state.booksFound.map((book)=>(
                          <Book book={book}
                          title={book.title}
                          author={book.authors}
                          img={book.imageLinks.thumbnail}
                          key = {book.id}
                          books={this.props.books}
                          shelfChange={this.props.shelfChange}/>))}

                        </ol>

                          {this.state.query.length === 0 && (
                          <div>
                              <div className = "Welcome-to-the-search-page.">
                                    <h3> Welcome! I hope you can find what you are looking for.</h3>
                              </div>
                          </div>
                          )}

                          {this.state.query.length >= 2 && this.state.booksFound.length === 0 && (
                          <div>
                              <div className ="Sorry">
                                    <h3> Unfortunately we don't have what you are looking for. Please try again.</h3>
                              </div>
                          </div>
                          )}
            </div>
    </div>
      )
  }
}

export default BookSearch

