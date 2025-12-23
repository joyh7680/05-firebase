import React from 'react'
import './BookDetail.css'
import Button from '../common/Button'

function BookDetail({ book }) {

  return (
    <div className="book-detail">
      <div className="detail-header">
        <div className="title-group">
          <h2 className="title">{book.title}</h2>
          {book.soldOut && <span className="badge">품절</span>}
        </div>
        <div className="category-box">{book.category?.categoryName}</div>
      </div>
      <div className="meta">
        <span className="author">{book.author}</span>
      </div>
      <div className="price">₩{book.price?.toLocaleString()}</div>
      <div className="actions">
        <Button variant="secondary">주문하기</Button>
      </div>
    </div>
  )
}

export default BookDetail