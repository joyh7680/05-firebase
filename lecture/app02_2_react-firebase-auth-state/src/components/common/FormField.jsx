import React from 'react'
import './Form.css'

function FormField({
  label,
  htmlFor,
  required = false,
  helperText,
  error,
  size, // 'sm' | 'lg'
  children,
}) {
  const classes = ['field']
  if (size === 'sm') classes.push('is-sm')
  if (size === 'lg') classes.push('is-lg')
  if (error) classes.push('is-invalid')

  return (
    <div className={classes.join(' ')}>
      {label && (
        <label className="label" htmlFor={htmlFor}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="control">
        {children}
      </div>

      {helperText && !error && <p className="helper">{helperText}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default FormField


