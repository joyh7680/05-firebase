import React from 'react'
import './Button.css'

/**
 * 
 * @param {object} props - 컴포넌트에 전달되는 props 객체
 * @param {React.ReactNode} props.children - 버튼 내부에 렌더링할 내용
 * @param {'primary' | 'secondary' | 'ghost' | 'success' | 'danger' | 'warning' | 'outline' | 'link'} [props.variant='primary'] - 버튼 스타일 종류
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - 버튼 크기
 * @param {boolean} [props.block=false] - 버튼을 블록(전체 너비)으로 표시할지 여부
 * @param {boolean} [props.disabled=false] - 버튼 비활성화 여부
 * @param {function} [props.onClick] - 버튼 클릭 시 실행될 함수
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - 버튼 타입
 * @returns 
 */
function Button({
  children,
  variant = 'primary', 
  size = 'md', 
  block = false,
  disabled = false,
  onClick,
  type = 'button',
}) {
  
  const className = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    block ? 'btn--block' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={className} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Button


