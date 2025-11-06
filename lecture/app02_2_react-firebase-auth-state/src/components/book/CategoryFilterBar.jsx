import React from 'react'
import './CategoryFilterBar.css'
import { getCategories } from '../../services/bookService'
import CategoryItem from './CategoryItem'
import { useEffect } from 'react';
import { useState } from 'react';

function CategoryFilterBar() {

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  return (
    <div className="category-select">
      <CategoryItem key="all" category={{ categoryCode: 'all', categoryName: '전체' }} />
      {categories.map((category) => (
        <CategoryItem key={category.categoryCode} category={category} />
      ))}
    </div>
  )
}

export default CategoryFilterBar