// backend/routes/api/recipe.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Recipe, User } = require('../../db/models');
const { restoreUser  } = require('../../utils/auth');

const router = express.Router();

// geting 4 recipes for loading infinite scroller
router.post('/scroll', asyncHandler(async (req, res) => {
  // const { user } = req.user;
  const { offset, limit, userId } = req.body;

  const recipes = await Recipe.getByLimit({ offset, limit, userId });
  return res.json(recipes);
}))

// Creating a new recipe from form
router.post('/', asyncHandler(async (req, res) => {
  const {
    title,
    ingredients,
    directions,
    originUrl,
    userId
  } = req.body;

  const newRecipe = await Recipe.createNewRecipe({ title, ingredients, directions, originUrl, userId })
  return res.json({ newRecipe });
}))

module.exports = router;
