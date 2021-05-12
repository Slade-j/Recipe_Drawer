// backend/routes/api/recipe.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Recipe, User } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const { title, ingredients, instruction } = req.body;
  console.log(title, ingredients, instruction, "checking req.body backend >>>>>>>>>>>")
}))

module.exports = router;
