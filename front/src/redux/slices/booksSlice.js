import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      // or --- return [...state, action.payload]
      state.push(action.payload)
    },

    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload)

      //  --- another option ---
      // const index = state.findIndex((book) => book.id === action.payload)
      // if (index !== -1) {
      //   state.splice(index, 1)
      // }
    },

    toggleFavorite: (state, action) => {
      return state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book,
      )

      // --- another option using createSlice ---
      // state.forEach((book) => {
      //   if (book.id === action.payload) {
      //     book.isFavorite = !book.isFavorite
      //   }
      // })
    },
  },
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBooks = (state) => state.books

export default booksSlice.reducer
