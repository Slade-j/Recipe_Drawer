// frontend/src/store/recipe.js
import { csrfFetch } from './csrf';

// constants
const SET_REVIEW = 'recipe/SET_REVIEW';
const SET_URL = 'recipe/SET_URL';
const RESET_REVIEW = 'recipe/RESET_REVIEW';

//actions
export const setReview = (data) => ({
  type: SET_REVIEW,
  payload: data
})

export const resetReview = () => ({
  type: RESET_REVIEW
})

export const setUrl = (data) => ({
  type: SET_URL,
  payload: data
})

//thunks
export const fetchReview = (data) => async (dispatch) => {
  const formData = new FormData()
  formData.append('image', data)
  formData.append('name', 'testing')
  const res = await csrfFetch('/api/ocr', {
    method: 'POST',
    body: formData,
    headers: { "Content-Type": "multipart/form-data" }
  })

  const { recipe, url } = await res.json();

  const review = recipe.map(line => line.join(' ')).join('\n')

  dispatch(setUrl(url))
  dispatch(setReview(review));
}

// reducer
const initialState = { review: null, url: null };
const recipeReducer = (state=initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_REVIEW:
      newState = Object.assign({}, state);
      newState.review = action.payload;
      return newState;
    case SET_URL:
      newState = Object.assign({}, state);
      newState.url = action.payload;
      return newState;
    case RESET_REVIEW:
      return initialState;
    default:
      return state;
  }
}

export default recipeReducer;
