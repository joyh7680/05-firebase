import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './BookManage.css'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import useModal from '../../hooks/useModal'
import CategoryFilterBar from '../../components/book/CategoryFilterBar'
import BookList from '../../components/book/BookList'
import ContentHeader from '../../components/admin/ContentHeader'
import BookForm from '../../components/admin/BookForm'
import { createBook } from '../../store/bookSlice'

function BookManage() {

  const books = useSelector((state) => state.book.books);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: 0,
    category: { categoryCode: '', categoryName: '' },
  })
  const dispatch = useDispatch();
  const registBookModal = useModal();

  const handleChange = (e) => {
    const { id, value, options } = e.target;
    setFormData({ 
      ...formData, 
      [id]: id === 'category' ? { categoryCode: value, categoryName: options[e.target.selectedIndex].text } : value
     })
  }  

  const handleRegistSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(createBook(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      registBookModal.close();
      setFormData({
        title: '',
        author: '',
        price: 0,
        category: { code: '', name: '' },
      })
    }
  }

  return (
    <>
      <ContentHeader 
        title="도서 상품 관리" 
        description="도서 상품들을 관리하는 페이지입니다." 
      />
      <div className="book-manage-actions">
        <Button onClick={registBookModal.open}>
          도서 등록
        </Button>
      </div>
      <Modal 
        isOpen={registBookModal.isOpen} 
        onClose={registBookModal.close}
      >
        <h3>신규 도서 등록</h3>
        <BookForm 
          formData={formData}
          buttonText="등록하기" 
          onHandleChange={handleChange}
          onSubmit={handleRegistSubmit} 
        />
      </Modal>
      <CategoryFilterBar />
      <BookList books={books} />
    </>
  )
}

export default BookManage