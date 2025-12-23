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
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <div className="book-info">
        <span className="book-name">{book.title}</span>
        <span className="book-price">₩{book.price.toLocaleString()}</span>
      </div>
      {/* 관리자만 보이는 도서상태변경을 위한 버튼들 */}
      {userProfile && userProfile.role === 'ADMIN' && <BookAction book={book} />}
      {/* 1) userProfile: userProfile이 존재하는지 확인  
      2) userProfile.role === 'ADMIN'인지 확인
      3)<BookAction book={book} /> 컴포넌트를 렌더링
      🔹 조건을 만족하지 않으면?

userProfile이 없거나
userProfile.role이 'ADMIN'이 아니라면
→ <BookAction />은 렌더링되지 않고, 아무것도 화면에 표시되지 않습니다.*/}
      
    </li>
  )
}

export default BookItem