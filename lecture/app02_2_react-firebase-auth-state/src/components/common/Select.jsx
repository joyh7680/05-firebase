import React from 'react'
import './Form.css'

function Select({ id, value, onChange, children, ...rest }) {
  return (
    <select id={id} className="select" value={value} onChange={onChange} {...rest}>
      {children}
    </select>
  )
}

export default Select


