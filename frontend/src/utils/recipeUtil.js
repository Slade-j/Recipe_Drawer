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
export const getLimitRecipes = async (params) => {
  const response = await csrfFetch('/api/recipe/scroll', {
    method: 'POST',
    body: JSON.stringify(params),
    header: { 'Content-Type': 'application/json' }
  });
  return await response.json();
}

// for editing a recipe
export const editRecipe = async (data) => {
  const response = await csrfFetch('/api/recipe/', {
    method: 'PUT',
    body: JSON.stringify(data),
    header: { 'Content-Type': 'application/json'},
  });
  const value =  await response.json();
  return value;

}

// for deleting a recipe
export const deleteRecipe = async (data) => {
  const response = await csrfFetch('/api/recipe/', {
    method: 'DELETE',
    body: JSON.stringify(data),
    header: { 'Content-Type': 'applicaton/json' }
  });

  return await response.json();
}
