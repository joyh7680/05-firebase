import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../common/Input'
import Button from '../common/Button'
import FormField from '../common/FormField'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../../store/authSlice'

function LoginForm() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { loading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(login(formData));
    if(result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <div className="auth-error">{error}</div>}
      <FormField
        label="이메일"
        htmlFor="email"
        required
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