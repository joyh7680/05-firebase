import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../common/Input'
import Button from '../common/Button'
import FormField from '../common/FormField'
import Radio from '../common/Radio'
import { useDispatch, useSelector } from 'react-redux'
import { signup, clearError } from '../../store/authSlice'

function SignupForm() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    address: '',
    gender: 'M'
  });
  const { loading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(clearError());
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(signup(formData));
    console.log(result);
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
        error={formData.email && !formData.email.includes('@') ? '이메일 형식이 올바르지 않습니다.' : null}
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
        error={formData.password && !(formData.password.length >= 8) ? '비밀번호는 최소 8자 이상이어야 합니다.' : null}
      >
        <Input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          placeholder="비밀번호를 입력하세요 (최소 8자)"
          minLength={6}
        />
      </FormField>
      <FormField
        label="비밀번호 확인"
        htmlFor="confirmPassword"
        required
        error={formData.confirmPassword && formData.confirmPassword !== formData.password ? '비밀번호가 일치하지 않습니다.' : null}
      >
        <Input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
          placeholder="비밀번호를 다시 입력하세요"
        />
      </FormField>
      <FormField
        label="이름"
        htmlFor="name"
      >
        <Input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="이름을 입력하세요"
        />
      </FormField>
      <FormField
        label="주소"
        htmlFor="address"
      >
        <Input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="주소를 입력하세요"
        />
      </FormField>
      <FormField
        label="성별"
        htmlFor="gender"
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Radio
            id="gender-m"
            name="gender"
            label="남성"
            value="M"
            checked={formData.gender === 'M'}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          />
          <Radio
            id="gender-f"
            name="gender"
            label="여성"
            value="F"
            checked={formData.gender === 'F'}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          />
        </div>
      </FormField>
      <Button
        type="submit"
        block
        disabled={loading}
      >
        {loading ? '가입 중...' : '회원가입'}
      </Button>
    </form>
  )
}

export default SignupForm