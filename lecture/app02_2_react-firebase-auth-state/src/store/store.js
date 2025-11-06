import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

const store = configureStore({  
  reducer: {
    auth: authReducer,  // {state: { auth: { userProfile, loading, error } } }
  },
})

export default store;