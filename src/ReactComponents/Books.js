import React, { Component } from 'react'
import ShelfSelector from './ShelfSelecter.js'

class Book extends Component {
  render() {
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.img})` }}></div>
			<ShelfSelector shelf = {this.props.shelf} book ={this.props.book} shelfChange={this.props.shelfChange}/>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.author}</div>
        </div>
      </li>
    )
  }
}
export default Book



