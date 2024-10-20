import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './books/reducer'
import filterReducer from './slices/filterSlice'

// import booksReducer from './slices/booksSlice'; // Import your slice

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
  },

  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development or use  devTools: true,
})

export default store
