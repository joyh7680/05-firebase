import React from 'react'
import {  Link } from 'react-router-dom'
import './AuthPage.css'
import LoginForm from '../../components/auth/LoginForm'

function LoginPage() {
  

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">로그인</h2>
        <LoginForm />
        <div className="auth-footer">
          <span>계정이 없으신가요? </span>
          <Link to="/auth/signup">회원가입</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
