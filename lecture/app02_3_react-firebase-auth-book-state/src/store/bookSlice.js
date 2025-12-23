import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addBook, updateBook, deleteBook, getBooks, updateBookSoldOut } from '../services/bookService';

// 도서 관리 상태
const initialState = {
  books: [],
  categories: [],
  loading: false,
  error: '',
}

// 도서 상태가 변경되는 경우 : 도서 추가, 도서 수정, 도서 품절 처리, 도서 삭제 등 .. => 비동기로 진행됨

// 1) 도서 추가 비동기 액션 
export const createBook = createAsyncThunk(
  'book/createBook',
  async (payload, { rejectWithValue }) => { // payload == { title, author, price, category {categoryCode, categoryName} }
    try {
      // - 도서 추가 요청 
      await addBook(payload);
      // - 갱신된 도서 목록 조회 요청
      const books = await getBooks();
      // - 갱신된 도서 목록을 상태로 저장시키기 위해 반환 (fulfilled 상태일때 사용될 데이터)
      return { books };
    } catch (error) {
      return rejectWithValue('도서 등록에 실패했습니다.');
    }
  }
)

// 2) 도서 수정 비동기 액션 
export const modifyBook = createAsyncThunk(
  'book/modifyBook',
  async (payload, { rejectWithValue }) => { // payload == { id, book: {title, author, price, category {categoryCode, categoryName}} }
    try {
      // - 도서 수정 요청 
      await updateBook(payload.id, payload.book);
      // - 갱신된 도서 목록 조회 요청
      const books = await getBooks();
      // - 갱신된 도서 목록을 상태로 저장시키기 위해 반환 (fulfilled 상태일때 사용될 데이터)
      return { books };
    } catch (error) {
      return rejectWithValue('도서 수정에 실패했습니다.');
    }
  }
)

// 3) 도서 삭제 처리 비동기 액션 
export const removeBook = createAsyncThunk(
  'book/removeBook',
  async (payload, { rejectWithValue }) => { // payload == id
    try {
      // - 도서 삭제 요청 
      await deleteBook(payload);
      // - 갱신된 도서 목록 조회 요청
      const books = await getBooks();
      // - 갱신된 도서 목록을 상태로 저장시키기 위해 반환 (fulfilled 상태일때 사용될 데이터)
      return { books };
    } catch (error) {
      return rejectWithValue('도서 삭제에 실패했습니다.');
    }
  }
)

// 4) 도서 품절 처리 비동기 액션 
export const modifyBookSoldOut = createAsyncThunk(
  'book/modifyBookSoldOut',
  async (payload, { rejectWithValue }) => { // payload == { id, soldOut }
    try {
      // - 도서 품절 처리 요청 
      await updateBookSoldOut(payload.id, payload.soldOut);
      // - 갱신된 도서 목록 조회 요청
      const books = await getBooks();
      // - 갱신된 도서 목록을 상태로 저장시키기 위해 반환 (fulfilled 상태일때 사용될 데이터)
      return { books };
    } catch (error) {
      return rejectWithValue('도서 품절 처리에 실패했습니다.');
    }
  }
)

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    // 에러 메시지 초기화 액션 : 도서 상태 변경 중 발생한 에러 메시지를 초기화 시키기 위한 액션
    clearError: (state) => {
      state.error = '';
    },
    // 초기 카테고리 목록 설정 액션 
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    // 초기 도서 목록 설정 액션 
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 1) 도서 추가 비동기 액션 처리  (pending, fulfilled, rejected)
    builder
      .addCase(createBook.pending, (state) => {
        state.loading = true; // 로딩중 상태 활성화
        state.error = '';     // 이전 에러 메시지 초기화
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false; 
        state.books = action.payload.books;
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    // 2) 도서 수정 비동기 액션 처리  (pending, fulfilled, rejected)
    builder
      .addCase(modifyBook.pending, (state) => {
        state.loading = true; // 로딩중 상태 활성화
        state.error = '';     // 이전 에러 메시지 초기화
      })
      .addCase(modifyBook.fulfilled, (state, action) => {
        state.loading = false; 
        state.books = action.payload.books;
      })
      .addCase(modifyBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    // 3) 도서 삭제 비동기 액션 처리  (pending, fulfilled, rejected)
    builder
      .addCase(removeBook.fulfilled, (state, action) => {
        state.loading = false; 
        state.books = action.payload.books;
      })
    // 4) 도서 품절 처리 비동기 액션 처리  (pending, fulfilled, rejected)
    builder
      .addCase(modifyBookSoldOut.fulfilled, (state, action) => {
        state.loading = false; 
        state.books = action.payload.books;
      })
  } 
});

export const { clearError, setBooks, setCategories } = bookSlice.actions;
export default bookSlice.reducer;