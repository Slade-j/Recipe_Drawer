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
