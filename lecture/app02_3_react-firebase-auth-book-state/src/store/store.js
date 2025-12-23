import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import bookReducer from './bookSlice'

const store = configureStore({  
  reducer: {
    auth: authReducer,  // {state: { auth: { userProfile, loading, error } } }
    book: bookReducer,  // {state: { book: { books, loading, error } } }
  },
})

export default store;