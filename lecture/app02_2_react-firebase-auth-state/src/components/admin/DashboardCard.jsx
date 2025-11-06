import React from 'react'
import './DashboardCard.css'

function DashboardCard({ title, icon, value, description, currency }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <div className="card-icon">{icon}</div>
      </div>
      <div className="card-value">{currency}{value.toLocaleString()}</div>
      <div className="card-description">{description}</div>
    </div>
  )
}

export default DashboardCard