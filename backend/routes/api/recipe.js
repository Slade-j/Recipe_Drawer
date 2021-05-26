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
    userId,
    mainIngredient
  } = req.body;

  const newRecipe = await Recipe.createNewRecipe({ title, ingredients, directions, originUrl, userId, mainIngredient })
  return res.json({ newRecipe });
}))

// Editing an existing recipe
router.put('/', asyncHandler(async (req, res) => {
  const { title, mainIngredient, directions, ingredients, id } = req.body;

  const recipe = await Recipe.findByPk(id);

  const result = await recipe.update({
    title,
    mainIngredient,
    directions,
    ingredients
  })

  return res.json({ result });
}))

module.exports = router;
