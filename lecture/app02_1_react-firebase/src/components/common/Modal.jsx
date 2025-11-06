import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'


/**
 * Modal 컴포넌트 
 * 
 * @param {object} props - 컴포넌트에 전달된 props 객체
 * @param {boolean} props.isOpen - 모달 열림 여부
 * @param {function} props.onClose - 모달 닫기 함수 (오버레이 클릭, X 버튼 클릭시 실행할 닫기 핸들러)
 * @param {React.ReactNode} props.children - 모달 내부에 렌더링할 콘텐츠 (재사용의 핵심 포인트)
 * @returns 
 */
function Modal({ isOpen, onClose, children }) {

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal
