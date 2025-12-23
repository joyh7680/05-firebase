import React from 'react'
import './CategoryFilterBar.css'
import CategoryItem from './CategoryItem'
import { useSelector } from 'react-redux';

function CategoryFilterBar() {

  const categories = useSelector((state) => state.book.categories);

  return (
    <div className="category-select">
      {
        [
          { categoryCode: 'all', categoryName: '전체' }, 
          ...categories
        ].map((category) => (
          <CategoryItem key={category.categoryCode} category={category} />
        ))
      }
    </div>
  )
}

export default CategoryFilterBar