import React from 'react'
import BookItem from './BookItem';
import './BookList.css';

function BookList() {

  // 현재 도서 목록 상태가 아래와 같다는 가정하에 
  const books = [
    {id: '1', title: '삼국지', author: '사마천', price: 15000, soldOut: false, category: {categoryCode: 'history', categoryName: '역사'}},
    {id: '2', title: '한국사 첫걸음', author: '이재용', price: 16000, soldOut: true, category: {categoryCode: 'history', categoryName: '역사'}},
    {id: '3', title: '과학혁명의 구조', author: 'Thomas S. Kuhn', price: 18000, soldOut: false, category: {categoryCode: 'science', categoryName: '기술과학'}},
    {id: '4', title: '오만과 편견', author: 'Jane Austen', price: 12000, soldOut: false, category: {categoryCode: 'literature', categoryName: '문학'}},
    {id: '5', title: 'React 어려우시죠?', author: 'Andrew Mead', price: 25000, soldOut: false, category: {categoryCode: 'it', categoryName: 'IT'}},
    {id: '6', title: '세계사 첫걸음', author: '이재용', price: 17000, soldOut: false, category: {categoryCode: 'history', categoryName: '역사'}},
    {id: '7', title: '나를 Java봐 ', author: 'James Gosling', price: 22000, soldOut: false, category: {categoryCode: 'it', categoryName: 'IT'}},
  ];

  return (
    <ul id="book-list" className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  )
}

export default BookList