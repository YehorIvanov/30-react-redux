import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  title: '',
  author: '',
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: 'folter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return { ...state, title: action.payload };
    },
    setAuthorFilter: (state, action) => {
      return { ...state, author: action.payload };
    },
    setOnlyFavoriteFilter: (state, action) => {
      // you can mutate state thanks to Immer library
      state.title = action.payload;
      //  you can also return new state as usally
      // return { ...state, onlyFavorite: action.payload };
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  resetFilters,
} = filterSlice.actions;
export const selectFilterTitle = (state) => state.filter.title;
export default filterSlice.reducer;
