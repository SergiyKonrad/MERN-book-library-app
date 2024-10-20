import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return { ...state, title: action.payload }
    },
  },
})

// const setTitleFilter = filterSlice.actions.setTitleFilter the same as
export const { setTitleFilter } = filterSlice.actions

export default filterSlice.reducer