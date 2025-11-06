import React from 'react'
import './BookAction.css'
import useModal from '../../hooks/useModal'
import BookForm from './BookForm';
import Modal from '../common/Modal';

function BookAction({ book }) {

  const editBookModal = useModal();

  const handleSoldOutBtnClick = (e) => {
    e.stopPropagation();

  }
  const handleEditBtnClick = (e) => {
    e.stopPropagation();
    editBookModal.open();
  }
  const handleDeleteBtnClick = (e) => {
    e.stopPropagation();

  }

  return (
    <>
      <div className="book-actions">
        <button className="soldout-btn" onClick={handleSoldOutBtnClick}>품절</button>
        <button className="edit-btn" onClick={handleEditBtnClick}>수정</button>
        <button className="delete-btn" onClick={handleDeleteBtnClick}>삭제</button>
      </div>
      <Modal isOpen={editBookModal.isOpen} onClose={editBookModal.close}>
        <h3>도서 수정</h3>
        <BookForm mode="edit" initialData={ book }/>
      </Modal>
    </>
  )
}

export default BookAction