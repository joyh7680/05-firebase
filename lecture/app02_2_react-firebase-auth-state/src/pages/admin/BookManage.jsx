import React from 'react'
import ContentHeader from '../../components/admin/ContentHeader'
import Button from '../../components/common/Button'
import './BookManage.css'
import useModal from '../../hooks/useModal'
import BookForm from '../../components/admin/BookForm'
import Modal from '../../components/common/Modal'
import CategoryFilterBar from '../../components/book/CategoryFilterBar'
import BookList from '../../components/book/BookList'

function BookManage() {

  const registBookModal = useModal();

  return (
    <>
      <ContentHeader title="도서 상품 관리" description="도서 상품들을 관리하는 페이지입니다." />
      <div className="book-manage-actions">
        <Button onClick={registBookModal.open} variant="primary">
          도서 등록
        </Button>
      </div>
      <Modal isOpen={registBookModal.isOpen} onClose={registBookModal.close}>
        <h3>신규 도서 등록</h3>
        <BookForm mode="regist" />
      </Modal>
      <CategoryFilterBar />
      <BookList />
    </>
  )
}

export default BookManage