import React, { useEffect, useState } from 'react'
import BookDetail from '../../components/book/BookDetail'
import { getBook } from '../../services/bookService';
import { useParams, useNavigate } from 'react-router-dom';

function BookDetailPage() {

  const {id} = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({id: '1', title: '삼국지', author: '사마천', price: 15000, soldOut: false, category: {categoryCode: 'history', categoryName: '역사'}});
  const [loading, setLoading] = useState(false);

  /*
  useEffect(() => {
    setLoading(true);
    const fetchBook = async () => {
      try {
        const book = await getBook(id);
        console.log(book);
        if(!book) {
          navigate('/books');
          return;
        }
        setBook(book);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);
  */

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <BookDetail book={book} />
        </>
      )}
    </div>
  )
}

export default BookDetailPage