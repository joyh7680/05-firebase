import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BookItem.css';
import BookAction from '../admin/BookAction';
import { useSelector } from 'react-redux';

function BookItem({ book }) {
  const { userProfile } = useSelector(state => state.auth);
  const navigate = useNavigate()

  return (
    <li 
      className={`book-item ${book.soldOut ? 'soldout' : ''}`} 
      onClick={() => navigate(`/books/${book.id}`)}>
      <div className="book-info">
        <span className="book-name">{book.title}</span>
        <span className="book-price">₩{book.price.toLocaleString()}</span>
      </div>
      {/* 관리자만 보이는 도서상태변경을 위한 버튼들 */}
      {userProfile && userProfile.role === 'ADMIN' && <BookAction book={book} />}
      
    </li>
  )
}

export default BookItem