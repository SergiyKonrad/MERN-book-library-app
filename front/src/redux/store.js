import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './books/reducer'

// import booksReducer from './slices/booksSlice'; // Import your slice

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  // devTools: true,
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
})

export default store
