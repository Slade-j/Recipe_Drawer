// frontend/src/store/recipe.js
import { csrfFetch } from './csrf';

// constants
const SET_REVIEW = 'recipe/SET_REVIEW';

//actions
export const setReview = (data) => ({
  type: SET_REVIEW,
  payload: data
})

//thunks
export const fetchReview = (data) => async (dispatch) => {
  const formData = new FormData()
  formData.append('image', data)
  formData.append('name', 'testing')
  const response = await csrfFetch('/api/ocr', {
    method: 'POST',
    body: formData,
    headers: { "Content-Type": "multipart/form-data" }
  })

  const returnData = await response.json();
  console.log(returnData, "before keying")
  // const review = returnData.ParsedResults[0].ParsedText
  // dispatch(setReview(review));
}

// reducer
const initialState = { review: ''};
const recipeReducer = (state=initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_REVIEW:
      newState = Object.assign({}, state);
      newState.review = action.payload;
      return newState
    default:
      return state;
  }
}
export default recipeReducer;
