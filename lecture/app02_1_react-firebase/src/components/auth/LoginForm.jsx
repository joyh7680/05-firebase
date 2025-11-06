import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import Input from '../common/Input'
import Button from '../common/Button'
import FormField from '../common/FormField'

function LoginForm() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // 로그인 진행 (인증 상태 변경 요청)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <div className="auth-error">{error}</div>}
      <FormField
        label="이메일"
        htmlFor="email"
        required
        error={error && error.includes('email') ? error : null}
      >
        <Input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          placeholder="이메일을 입력하세요"
        />
      </FormField>
      <FormField
        label="비밀번호"
        htmlFor="password"
        required
        error={error && error.includes('password') ? error : null}
      >
        <Input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          placeholder="비밀번호를 입력하세요"
        />
      </FormField>
      <Button
        type="submit"
        block
        disabled={loading}
      >
        {loading ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  )
}

export default LoginForm