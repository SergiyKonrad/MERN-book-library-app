import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import createBookWithID from '../../utils/createBookWithID'
import { setError } from './errorSlice'

const initialState = {
  books: [],
  isLoadingViaAPI: false,
}

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload)
    },

    deleteBook: (state, action) => {
      // return {
      //   ...state,
      //   books: state.filter((book) => book.id !== action.payload),
      // }

      /* Since Redux Toolkit uses Immer under the hood, direct assignments like state.books = ... work without needing a return statement.
       This style is preferred for clarity and follows best practices for handling state mutations in Redux Toolkit.
       */
      state.books = state.books.filter((book) => book.id !== action.payload)
    },

    toggleFavorite: (state, action) => {
      const book = state.books.find((book) => book.id === action.payload)
      if (book) book.isFavorite = !book.isFavorite // Simple toggle without .map
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoadingViaAPI = true
        state.error = null // Optional: reset local error state
      })

      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoadingViaAPI = false
        if (action?.payload?.title && action?.payload?.author) {
          state.books.push(createBookWithID(action.payload, true, 'API'))
        }
      })

      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoadingViaAPI = false
        state.error = action.payload
      })
  },
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBooks = (state) => state.books.books
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI

export default booksSlice.reducer
