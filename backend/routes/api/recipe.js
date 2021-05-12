// backend/routes/api/recipe.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Recipe, User } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const {
    title,
    ingredients,
    directions,
    originUrl,
    userId
  } = req.body;

  const newRecipe = Recipe.createNewRecipe({ title, ingredients, directions, originUrl, userId })
  return res.json({ newRecipe });
}))

module.exports = router;
