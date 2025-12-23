import React from 'react'
import './Form.css'

function Radio({ name, id, label, checked, onChange, ...rest }) {
  return (
    <label className="radio" htmlFor={id}>
      <input id={id} name={name} type="radio" checked={checked} onChange={onChange} {...rest} />
      <span>{label}</span>
    </label>
  )
}

export default Radio


