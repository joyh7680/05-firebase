import React from 'react'
import './CategoryItem.css'

function CategoryItem({ category }) {
  return (
    <button 
      type="button" 
      className="category-btn" 
      data-category-code={category.categoryCode}
      >
      {category.categoryName}
    </button>
  )
}

export default CategoryItem