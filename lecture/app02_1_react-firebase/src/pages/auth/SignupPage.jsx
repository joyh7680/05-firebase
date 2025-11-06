import React from 'react'
import { Link } from 'react-router-dom'
import './AuthPage.css'
import SignupForm from '../../components/auth/SignupForm'

function SignupPage() {

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">회원가입</h2>
        <SignupForm />
        <div className="auth-footer">
          <span>이미 계정이 있으신가요? </span>
          <Link to="/auth/login">로그인</Link>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
