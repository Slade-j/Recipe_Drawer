const express = require('express');
const asyncHandler = require('express-async-handler');
const { Book } = require('../../db/models');

const router = express.Router();+

// creating a new book
router.post('/', asyncHandler(async (req, res) => {
  const { title, userId } = req.body;

  const newBook = await Book.createNewBook(req.body);
  return res.json({ newBook });
}))

module.exports = router;
