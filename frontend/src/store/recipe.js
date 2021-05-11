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
  console.log(data, "in thunk>>>>>>>>>>>>>>>>>>")
  const formData = new FormData()
  formData.append('image', data)
  formData.append('name', data.name)
  const response = await csrfFetch('/api/ocr', {
    method: 'POST',
    body: formData,
    headers: { "Content-Type": "multipart/form-data" }
    // headers: { "Contect-type": " x-www-form-urlencoded" }
  })

  const returnData = await response.json();
  console.log(returnData, "checking return !!!!!!!!!")
}
