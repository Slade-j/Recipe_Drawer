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
  console.log(returnData, "checking return !!!!!!!!!")
}
