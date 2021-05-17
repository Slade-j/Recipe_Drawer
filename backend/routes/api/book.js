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
  return res.json({ newBook });
}));

// getting all recipes for a book

router.post('/recipes', asyncHandler(async (req, res) => {
  const { id, limit, offset } = req.body;
  try {
    const books = await Book.getByLimit({ id, limit, offset, Recipe });
    return res.json(books);
  } catch (err) {
    console.log(err, "errfrom post")
  }
}))
module.exports = router;
