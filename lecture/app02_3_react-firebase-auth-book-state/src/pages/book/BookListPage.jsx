import React, { useState, useEffect } from 'react'
import CategoryFilterBar from '../../components/book/CategoryFilterBar'
import BookList from '../../components/book/BookList'
import { useSelector } from 'react-redux'

function BookListPage() {

  const books = useSelector((state) => state.book.books);
  
  
  return (
    <div>
      <CategoryFilterBar />
      <BookList books={books} />  
    </div>
  )
}

export default BookListPage