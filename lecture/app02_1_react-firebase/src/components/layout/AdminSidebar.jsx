import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminSidebar() {
  const activeStyle = {backgroundColor: '#eef2ff', color: '#333;'}
  return (
    <aside className="sidebar">
      <h3>메뉴</h3>
      <ul className="sidebar-menu">
        <li><NavLink to="/admin" end>대시보드홈</NavLink></li>
        <li><NavLink to="/admin/users" end>사용자관리</NavLink></li>
        <li><NavLink to="/admin/books" end>상품관리</NavLink></li>
      </ul>
    </aside>
  )
}

export default AdminSidebar