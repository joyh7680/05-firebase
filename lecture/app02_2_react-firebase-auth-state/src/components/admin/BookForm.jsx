import React, { useEffect, useState } from 'react'
import './BookForm.css'
import FormField from '../common/FormField'
import Input from '../common/Input'
import Select from '../common/Select'
import { getCategories } from '../../services/bookService'
import Button from '../common/Button'

// 도서 등록 및 수정 폼 컴포넌트 
function BookForm({ mode, initialData }) {

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: 0,
    category: { code: '', name: '' },
  })

  const handleChange = (e) => {
    const { id, value, textContent } = e.target;
    setFormData({ 
      ...formData, 
      [id]: id === 'category' ? { code: value, name: textContent } : value
     })
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if(initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        price: initialData.price,
        category: initialData.category
      })
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault();

    if(mode === "regist") {

    }else if(mode === "edit") {

    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="카테고리" htmlFor="category" required>
        <Select
          id="category" 
          value={formData.category.categoryCode} 
          onChange={handleChange}
        >
          {categories.map((category) => <option value={category.categoryCode}>{category.categoryName}</option>)}
        </Select>
      </FormField>
      <FormField label="도서명" htmlFor="title" required>
        <Input 
          id="title" 
          placeholder="도서명을 입력해주세요"
          value={formData.title}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="저자" htmlFor="author" required>
        <Input 
          id="author" 
          placeholder="저자를 입력해주세요" 
          value={formData.author}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="가격" htmlFor="price" required>
        <Input 
          id="price" 
          placeholder="가격을 입력해주세요" 
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
      </FormField>
      <Button type="submit" block>{mode === "regist" ? "등록하기" : "수정하기"}</Button>
    </form>
  )
}

export default BookForm