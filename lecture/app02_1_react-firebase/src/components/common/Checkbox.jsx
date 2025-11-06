import React from 'react'
import './Form.css'

function Checkbox({ id, label, checked, onChange, ...rest }) {
  return (
    <label className="checkbox" htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} {...rest} />
      <span>{label}</span>
    </label>
  )
}

export default Checkbox


