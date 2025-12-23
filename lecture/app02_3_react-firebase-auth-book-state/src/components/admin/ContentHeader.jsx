import React from 'react'
import './ContentHeader.css'

function ContentHeader({ title, description }) {
  return (
    <div className="content-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default ContentHeader