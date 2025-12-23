import React, { useState } from 'react'
import './BookAction.css'
import useModal from '../../hooks/useModal'
import BookForm from './BookForm';
import Modal from '../common/Modal';
import { useDispatch } from 'react-redux';
import { modifyBook, modifyBookSoldOut, removeBook } from '../../store/bookSlice';

function BookAction({ book }) {

  // 수정 모달에서의 입력값 관리를 위한 상태 (수정 폼으로 전달되서 사용)
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    price: book.price,
    category: book.category,
  })
  const dispatch = useDispatch();
  const editBookModal = useModal();

  // 수정 모달에서의 입력값 변경 이벤트 핸들러 (수정 폼으로 전달되서 사용)
  const handleChange = (e) => {
    const { id, value, options } = e.target;
    setFormData({ 
      ...formData, 
      [id]: id === 'category' ? { categoryCode: value, categoryName: options[e.target.selectedIndex].text } : value
     })
  }  

  // 수정 모달에서의 수정 버튼 클릭 이벤트 핸들러 (수정 폼으로 전달되서 사용)
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(modifyBook({ id: book.id, book: formData }));
    if (result.meta.requestStatus === 'fulfilled') {
      editBookModal.close();
    } 
  }

  const handleSoldOutBtnClick = async (e) => {
    const result = await dispatch(modifyBookSoldOut({
      id: book.id, 
      soldOut: !book.soldOut
    }));
    if (result.meta.requestStatus === 'fulfilled') {
      alert('도서 품절 여부가 수정되었습니다.');
    }else {
      alert(result.payload); // dispatch 처리 중 발생한 에러 메시지
    }
  }
  
  const handleDeleteBtnClick = async (e) => {
    if(confirm('정말 삭제하시겠습니까?')) {
      const result = await dispatch(removeBook(book.id));
      if (result.meta.requestStatus === 'fulfilled') {
        alert('도서 삭제가 완료되었습니다.');
      }else {
        alert(result.payload); // dispatch 처리 중 발생한 에러 메시지
      }
    }
  }

  

  return (
    <>
      <div className="book-actions" onClick={(e) => e.stopPropagation()}>
        <button className="soldout-btn" onClick={handleSoldOutBtnClick}>품절</button>
        <button className="edit-btn" onClick={editBookModal.open}>수정</button>
        <button className="delete-btn" onClick={handleDeleteBtnClick}>삭제</button>
      </div>
      <Modal 
        isOpen={editBookModal.isOpen} 
        onClose={editBookModal.close}
      >
        <h3>도서 수정</h3>
        <BookForm 
          formData={formData}
          buttonText="수정하기" 
          onHandleChange={handleChange}
          onSubmit={handleEditSubmit}/>
      </Modal>
    </>
  )
}

export default BookAction