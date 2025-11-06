import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // 본인의 Firebase 환경설정값 작성
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 더미 데이터 추가
const categories = [
  { categoryCode: "it", categoryName: "IT" },
  { categoryCode: "science", categoryName: "기술과학" },
  { categoryCode: "literature", categoryName: "문학" },
  { categoryCode: "history", categoryName: "역사" },
];

const books = [
  {
    title: "삼국지",
    author: "사마천",
    price: 15000,
    soldOut: false,
    category: { categoryCode: "history", categoryName: "역사" },
  },
  {
    title: "한국사 첫걸음",
    author: "이재용",
    price: 16000,
    soldOut: false,
    category: { categoryCode: "history", categoryName: "역사" },
  },
  {
    title: "과학혁명의 구조",
    author: "Thomas S. Kuhn",
    price: 18000,
    soldOut: false,
    category: { categoryCode: "science", categoryName: "기술과학" },
  },
  {
    title: "오만과 편견",
    author: "Jane Austen",
    price: 12000,
    soldOut: false,
    category: { categoryCode: "literature", categoryName: "문학" },
  },
  {
    title: "React 어려우시죠?",
    author: "Andrew Mead",
    price: 25000,
    soldOut: false,
    category: { categoryCode: "it", categoryName: "IT" },
  },
  {
    title: "세계사 첫걸음",
    author: "이재용",
    price: 17000,
    soldOut: false,
    category: { categoryCode: "history", categoryName: "역사" },
  },
  {
    title: "Python 완벽 가이드",
    author: "Guido van Rossum",
    price: 20000,
    soldOut: false,
    category: { categoryCode: "it", categoryName: "IT" },
  },
  {
    title: "IOT 기술의 이해",
    author: "오브띵스키",
    price: 15000,
    soldOut: false,
    category: { categoryCode: "science", categoryName: "기술과학" },
  },
  {
    title: "황비홍전",
    author: "허균",
    price: 13000,
    soldOut: false,
    category: { categoryCode: "literature", categoryName: "문학" },
  },
  {
    title: "첨단기술의 이해",
    author: "이순신",
    price: 15000,
    soldOut: false,
    category: { categoryCode: "science", categoryName: "기술과학" },
  },
  {
    title: "C# 완벽 가이드",
    author: "Anders Hejlsberg",
    price: 23000,
    soldOut: false,
    category: { categoryCode: "it", categoryName: "IT" },
  },
  {
    title: "세계사 첫걸음",
    author: "이재용",
    price: 17000,
    soldOut: false,
    category: { categoryCode: "history", categoryName: "역사" },
  },
  {
    title: "주희",
    author: "이황",
    price: 14000,
    soldOut: false,
    category: { categoryCode: "literature", categoryName: "문학" },
  },
  {
    title: "C++ 완벽 가이드",
    author: "Bjarne Stroustrup",
    price: 24000,
    soldOut: false,
    category: { categoryCode: "it", categoryName: "IT" },
  },
  {
    title: "빅데이터란",
    author: "큰값",
    price: 20000,
    soldOut: false,
    category: { categoryCode: "science", categoryName: "기술과학" },
  },
  {
    title: "JavaScript 파헤쳐보기",
    author: "David Flanagan",
    price: 30000,
    soldOut: true,
    category: { categoryCode: "it", categoryName: "IT" },
  },
  {
    title: "나를 Java봐 ",
    author: "James Gosling",
    price: 22000,
    soldOut: false,
    category: { categoryCode: "it", categoryName: "IT" },
  },
];

const initCategoriesData = async () => {
  categories.forEach((category) => {
    addDoc(collection(db, "categories"), category);
  });
};

initCategoriesData();

const initBooksData = async () => {
  books.forEach((book) => {
    addDoc(collection(db, "books"), {
      ...book,
      createdAt: serverTimestamp(),
    });
  });
};

initBooksData();
