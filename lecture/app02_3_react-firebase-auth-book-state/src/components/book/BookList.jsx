import React from 'react'
import BookItem from './BookItem';
import './BookList.css';

function BookList({ books }) {
  
  return (
    <ul id="book-list" className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  )
}

export default BookList