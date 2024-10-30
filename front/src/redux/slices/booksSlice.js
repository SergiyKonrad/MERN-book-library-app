import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import createBookWithID from '../../utils/createBookWithID'
import { setError } from './errorSlice'

const initialState = []

// const initialState = {
//   books: [],
//   loading: false,
// }

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    // async (url, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      thunkAPI.dispatch(setError(error.message))
      throw error
    }
  },
)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload)
      // or ---   state.books.push(action.payload);
    },

    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload)
      // Since Redux Toolkit uses Immer under the hood, direct assignments like state.books = ... work without needing a return statement. This style is preferred for clarity and follows best practices for handling state mutations in Redux Toolkit.

      // state.books = state.books.filter((book) => book.id !== action.payload)
    },

    toggleFavorite: (state, action) => {
      return state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book,
      )
      // --- another option using createSlice and IMMER library ---
      // state.forEach((book) => {
      //   if (book.id === action.payload) {
      //     book.isFavorite = !book.isFavorite
      //   }
      // })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithID(action.payload, true, 'API'))
      }
    })

    // .addCase(fetchBook.rejected, (state, action) => {
    //   state.loading = false
    //   state.error = action.error.message
    // })
  },
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBooks = (state) => state.books

export default booksSlice.reducer
