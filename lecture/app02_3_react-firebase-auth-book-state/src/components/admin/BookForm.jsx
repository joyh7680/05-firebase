import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './BookForm.css'
import FormField from '../common/FormField'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'

/**
 * 도서 폼 컴포넌트 (등록 모달, 수정 모달에서 사용)
 * @param {Object} formData - 입력값 관리를 위한 상태
 * @param {string} buttonText - 버튼 텍스트
 * @param {Function} onHandleChange - 입력값 변경 핸들러
 * @param {Function} onSubmit - 폼 제출 핸들러
 * @returns 
 */
function BookForm({ formData, buttonText, onHandleChange, onSubmit }) {

  const categories = useSelector((state) => state.book.categories);
  const { loading, error } = useSelector((state) => state.book);

  return (
    <form onSubmit={onSubmit}>
      <FormField label="카테고리" htmlFor="category" required>
        <Select
          id="category" 
          value={formData.category.categoryCode} 
          onChange={onHandleChange}
        >
          {categories.map((category) => <option key={category.categoryCode} value={category.categoryCode}>{category.categoryName}</option>)}
        </Select>
      </FormField>
      <FormField label="도서명" htmlFor="title" required>
        <Input 
          id="title" 
          placeholder="도서명을 입력해주세요"
          value={formData.title}
          onChange={onHandleChange}
        />
      </FormField>
      <FormField label="저자" htmlFor="author" required>
        <Input 
          id="author" 
          placeholder="저자를 입력해주세요" 
          value={formData.author}
          onChange={onHandleChange}
        />
      </FormField>
      <FormField label="가격" htmlFor="price" required>
        <Input 
          id="price" 
          placeholder="가격을 입력해주세요" 
          type="number"
          value={formData.price}
          onChange={onHandleChange}
        />
      </FormField>
      <Button 
        type="submit" 
        block 
        disabled={loading}
      >
        {loading ? "처리중..." : buttonText}
      </Button>
      {error && <div className="error-message">{error}</div>}
    </form>
  )
}

export default BookForm