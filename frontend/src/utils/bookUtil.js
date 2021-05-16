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
