import React from 'react'
import './MainLayout.css'
import MainHeader from '../components/layout/MainHeader'
import MainFooter from '../components/layout/MainFooter'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className='app-container main-layout'>
      <MainHeader />
      <main className="main-content">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  )
}

export default MainLayout