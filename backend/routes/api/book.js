const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');
const { Book, Recipe } = require('../../db/models');

const router = express.Router();

// getting all user books
router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const { user } = req;

  const allBooks = await Book.findAll({ where: {userId: user.id} });
  return res.json({allBooks});
}));


// creating a new book
router.post('/', asyncHandler(async (req, res) => {
  const { title, userId } = req.body;

  const newBook = await Book.createNewBook(req.body);
  const allBooks = await Book.findAll({where: {userId}})
  return res.json({ allBooks });
}));

// getting all recipes for a book
router.post('/recipes', asyncHandler(async (req, res) => {
  const { id, limit, offset } = req.body;

  try {
    const recipes = await Book.getByLimit({ id, limit, offset });
    return res.json(recipes);

  } catch (err) {
    console.log(err, "errfrom post")
  }
}));

// adding recipe to book
router.post('/add-recipe', asyncHandler(async (req, res) => {
  const { subValue, recipeId } = req.body;

  const recipe = await Recipe.findOne({where: { id: recipeId }});
  const books = await Promise.all(
    subValue.map(id => Book.findOne({where: { id }}))
    )

  for (const book of books) {
    await book.addRecipe(recipe);
  }

  return res.json({ recipe });
}));

// removing recipe from book
router.patch('/:bookId', asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { recipeId } = req.body;

  const recipe = await Recipe.findOne({where: { id: recipeId }});
  const book = await Book.findOne({where: { id: bookId }});
  await book.removeRecipe(recipe);

  return res.json({ book, recipe });
}));

// destroying book model instance from user
router.delete('/:bookId', asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.body;

  const book = await Book.findOne({where: { id: bookId }});
  const recipes = await book.getRecipes();
  await book.removeRecipes(recipes)
  await Book.destroy({where: { id: bookId }});
  const allBooks = await Book.findAll({where: { userId }});

  return res.json({ allBooks })
}));

module.exports = router;
