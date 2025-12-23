import React from 'react'
import { NavLink } from 'react-router-dom'

function MyPageSidebar() {
  return (
    <aside className="mypage-sidebar">
      <nav className="mypage-sidenav">
        <h3 className="mypage-sidenav-title">마이페이지</h3>
        <ul className="mypage-sidenav-menu">
          <li><NavLink to="/mypage" end>내 정보</NavLink></li>
          <li><NavLink to="/mypage/orders" end>주문 내역</NavLink></li>
        </ul>
      </nav>
    </aside>
  )
}

export default MyPageSidebar

