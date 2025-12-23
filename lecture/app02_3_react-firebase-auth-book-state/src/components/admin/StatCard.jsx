import React from 'react'
import './StatCard.css'

function StatCard({ value, title, percentage }) {
  return (
    <div className="stat-card">
      <div className="stat-number">{percentage ? value + '%' : value}</div>
      <div className="stat-label">{title}</div>
    </div>
  )
}

export default StatCard