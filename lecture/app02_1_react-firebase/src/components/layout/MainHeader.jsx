import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../common/Button'

function MainHeader() {
  return (
    <header className="main-header">
      <div className="main-header-content">
        <NavLink to="/" className="main-logo">POTENUP-BOOKS</NavLink>
        <nav>
          <ul className="main-nav">
            <li><NavLink to="/" end>홈</NavLink></li>
            <li><NavLink to="/books" end>도서</NavLink></li>
            {/* 로그인 전 */}
            <li><NavLink to="/auth/login" end>로그인</NavLink></li>
            <li><NavLink to="/auth/signup" end>회원가입</NavLink></li>
            {/* 로그인 후 */}
            <li><NavLink to="/mypage" end>사용자명님</NavLink></li>
            <li><NavLink to="/admin" end>관리자 페이지</NavLink></li> {/* 관리자 권한의 사용자일 경우 */}
            <li><span>로그아웃</span></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default MainHeader