// frontend/src/store/books.js
import { csrfFetch } from './csrf';

// constants
const SET_BOOKS = 'books/SET_BOOKS';

// actions
export const setBooks = (data) => ({
  type: SET_BOOKS,
  payload: data
})

// thunks
export const getBooks = () => async (dispatch) => {
  const response = await csrfFetch('/api/book')
  const books = await response.json();
  const data = books.allBooks
  dispatch(setBooks(data));
}

export const deleteBook = (data) => async (dispatch) => {
  const { bookId, userId } = data;
  const response = await csrfFetch(`/api/book/${bookId}`, {
    method: 'DELETE',
    body: JSON.stringify({ userId }),
    header: { 'Content-Type': 'application/json' }
  });

  const books = await response.json();
  const { allBooks } = books
  dispatch(setBooks(allBooks))
}

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
