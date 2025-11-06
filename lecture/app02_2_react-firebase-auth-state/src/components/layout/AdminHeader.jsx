import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminHeader() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Dashboard</div>
        <nav>
          <ul className="nav-menu">
            <li><NavLink to="/admin" end>대시보드홈</NavLink></li>
            <li><NavLink to="/" end>사용자홈</NavLink></li>
            <li><NavLink to="/admin/analytics" end>분석</NavLink></li>
            <li><NavLink to="/admin/reports" end>보고서</NavLink></li>
            <li><NavLink to="/admin/settings" end>설정</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AdminHeader