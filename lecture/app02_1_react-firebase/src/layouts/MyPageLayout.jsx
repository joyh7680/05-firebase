import React from 'react'
import './MyPageLayout.css'
import { Outlet } from 'react-router-dom'
import MyPageSidebar from '../components/layout/MyPageSidebar'

function MyPageLayout() {
  return (
    <div className='mypage-layout'>
      <MyPageSidebar />
      <section className="mypage-content">
        <Outlet />
      </section>
    </div>
  )
}

export default MyPageLayout