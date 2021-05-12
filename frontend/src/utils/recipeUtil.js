// frontend/src/utils/recipeUtil.js
import { csrfFetch } from "../store/csrf"

export const createRecipe = async (data) => {
  const response = await csrfFetch('/api/recipe', {
    method: 'POST',
    body: JSON.stringify(data),
    header: { 'Content-Type': 'application/json' },
  })

  return await response.json();
}
