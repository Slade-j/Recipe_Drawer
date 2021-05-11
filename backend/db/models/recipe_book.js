'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipe_book = sequelize.define('Recipe_book', {
    recipeId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  recipe_book.associate = function(models) {
    // associations can be defined here
  };
  return recipe_book;
};
