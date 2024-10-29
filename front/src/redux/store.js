import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/booksSlice'
import filterReducer from './slices/filterSlice'
import errorReducer from './slices/errorSlice'

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    error: errorReducer,
  },

  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development or use  devTools: true,
})

export default store
