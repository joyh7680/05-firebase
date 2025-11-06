import React from 'react'
import './AdminLayout.css'
import AdminHeader from '../components/layout/AdminHeader'
import AdminSidebar from '../components/layout/AdminSidebar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='app-container admin-layout'>
      <AdminHeader />
      <div className="main-container">
        <AdminSidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout