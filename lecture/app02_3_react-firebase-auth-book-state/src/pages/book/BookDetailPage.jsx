import React, { useEffect, useState } from 'react'
import BookDetail from '../../components/book/BookDetail'
import { getBook } from '../../services/bookService';
import { useParams } from 'react-router-dom';

function BookDetailPage() {

  const [book, setBook] = useState({});
  const {id} = useParams();
  useEffect(() => {
    const fetchBook = async () => {
      const book = await getBook(id);
      if(!book) {
        navigate('/books');
        return;
      }
      setBook(book);
    };
    fetchBook();
  }, []);

  return (
    <div>
      <BookDetail book={book} />
    </div>
  )
}

export default BookDetailPage