// frontend/src/utils/recipeUtil.js
import { csrfFetch } from "../store/csrf"

// for creating a new recipe
export const createRecipe = async (data) => {
  const response = await csrfFetch('/api/recipe', {
    method: 'POST',
    body: JSON.stringify(data),
    header: { 'Content-Type': 'application/json' },
  })

  return await response.json();
}

// for getting user recipes for all-recipe page (4 at a time)
export const getLimitRecipes = async (perams) => {
  const response = await csrfFetch('/api/recipe/scroll', {
    method: 'POST',
    body: JSON.stringify(perams),
    header: { 'Content-Type': 'application/json' }
  });

  return await response.json();
}
