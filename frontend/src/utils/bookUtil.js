import { csrfFetch } from "../store/csrf"

// creating a new book
export const createBook = async (data) => {

  const response = await csrfFetch('/api/book', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  const newBook = await response.json();
  return newBook;
}

// for getting book recipes
export const getLimitBooks = async (params) => {
  const response = await csrfFetch('/api/book/recipes', {
    method: 'POST',
    body: JSON.stringify(params),
    header: { 'Content-Type': 'application/json' }
  });

  return await response.json();
}

// for adding a recipe to a book
export const addRecipe = async (data) => {
  const { recipeId, subValue } = data;
  const response = await csrfFetch(`/api/book/${subValue}`, {
    method: 'POST',
    body: JSON.stringify({ recipeId }),
    header: { 'Content-Type': 'application/json' }
  });

  return await response.json();
}

// for removeing a recipe from a book
export const removeRecipe = async (data) => {
  const { bookId, recipeId } = data;
  const response = await csrfFetch(`/api/book/${bookId}`, {
    method: 'PATCH',
    body: JSON.stringify({ recipeId }),
    header: { 'Content-Type': 'application/json' }
  });

  return await response.json();
}
