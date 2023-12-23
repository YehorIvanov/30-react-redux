import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId';
import { setError } from './errorSlice';

// const initialState = [];
const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, chunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      chunkAPI.dispatch(setError(error.message));
      // throw error;
      return chunkAPI.rejectWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      return { ...state, books: [...state.books, action.payload] };
    },

    // deleteBook: (state, action) => {
    //   return state.books.filter((book) => book.id !== action.payload);
    // },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    // toggleFavoriteBook: (state, action) => {
    //   return state.books.map((book) =>
    //     book.id === action.payload
    //       ? { ...book, isFavorite: !book.isFavorite }
    //       : book
    //   );
    // },
    toggleFavoriteBook: (state, action) => {
      const book = state.books.find((book) => book.id === action.payload);
      if (book) {
        book.isFavorite = !book.isFavorite;
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBook.fulfilled, (state, action) => {
  //     if (action.payload.author && action.payload.title) {
  //       return [...state.books, createBookWithId(action.payload, 'API')];
  //     }
  //   });
  // },

  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      if (action.payload.author && action.payload.title) {
        state.books.push(createBookWithId(action.payload, 'API'));
      }
    });
    builder.addCase(fetchBook.pending, (state, action) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      state.isLoadingViaAPI = false;
    });
  },
});
export const { addBook, deleteBook, toggleFavoriteBook } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;
export default booksSlice.reducer;

// export const chunkFunction = async (dispatch, getState) => {
//   console.log(getState());
//   try {
//     const res = await axios.get('http://localhost:4000/random-book');
//     if (res.data && res.data.title && res.data.author) {
//       dispatch(addBook(createBookWithId(res.data, 'API')));
//     }
//   } catch (e) {
//     console.log(e.message);
//   }
// };
