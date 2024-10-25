import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  author: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // using Immer Library
      state.title = action.payload
      //  or standard way to return new state as usually
      //  return {...state, title: action.payload}
    },

    setAuthorFilter: (state, action) => {
      state.author = action.payload
    },
    resetFilters: (state) => {
      //   state.title = ''
      return initialState
    },
  },
})

// export const setTitleFilter = filterSlice.actions.setTitleFilter the same as:
export const { setTitleFilter, setAuthorFilter, resetFilters } =
  filterSlice.actions

export const selectTitleFilter = (state) => state.filter.title
export const selectAuthorFilter = (state) => state.filter.author

export default filterSlice.reducer
