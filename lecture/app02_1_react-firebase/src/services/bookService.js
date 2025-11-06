import {db} from '../firebase/config'
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore'

// 도서 및 카테고리 정보 CRUD 관련 서비스 

const BOOKS_COLLECTION_NAME = 'books';
const CATEGORIES_COLLECTION_NAME = 'categories';

/**
 * 카테고리 목록 조회 
 * @returns {Array} 카테고리 목록 [ {categoryCode, categoryName}, ... ]
 */
export const getCategories = async () => {
  const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION_NAME));
  return snapshot.docs.map((doc) => doc.data());
}

/**
 * 전체 도서 조회 
 * @returns {Array} 전체 도서 목록 [ {id, title, author, price, category {categoryCode, categoryName}, createdAt}, ... ]
 */ 
export const getBooks = async () => {
  const snapshot = await getDocs(collection(db, BOOKS_COLLECTION_NAME));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

/**
 * 도서 상세 조회 
 * @param {string} id - 도서 고유 ID 
 * @returns {object} 도서 상세 { id, title, author, price, category {categoryCode, categoryName}, createdAt }
 */
export const getBook = async (id) => {
  const snapshot = await getDoc(doc(db, BOOKS_COLLECTION_NAME, id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

/**
 * 신규 도서 등록 
 * @param {object} book - 신규 도서 데이터 { title, author, price, category {categoryCode, categoryName} }
 * @returns {string} 등록된 도서 ID
 */
export const addBook = async (book) => {
  const docRef = await addDoc(collection(db, BOOKS_COLLECTION_NAME), {
    ...book,
    soldOut: false,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

