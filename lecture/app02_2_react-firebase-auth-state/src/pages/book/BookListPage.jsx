import React from 'react'
import CategoryFilterBar from '../../components/book/CategoryFilterBar'
import BookList from '../../components/book/BookList'

function BookListPage() {
  return (
    <div>
      <CategoryFilterBar />
      <BookList />  
    </div>
  )
}

export default BookListPage