// frontend/src/store/books.js
import { csrfFetch } from './csrf';

// constants
const SET_BOOKS = 'books/SET_BOOKS';

// actions
export const setBooks = (data) => ({
  type: SET_BOOKS,
  payloade: data
})

// thunks

// reducer
const initialState = { allBooks: null }
const booksReducer = (state=initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_BOOKS:
      newState = Object.assign({}, state);
      newState.allBooks = action.payload;
      return newState;
    default:
      return state;
  }
}

export default booksReducer;
