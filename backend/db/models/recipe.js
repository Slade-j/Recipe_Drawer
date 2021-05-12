'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    originUrl: DataTypes.STRING,
    mainIngredient: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    directions: DataTypes.TEXT
  }, {});
  Recipe.associate = function(models) {

    const columnMapping = {
      through: 'Recipe_book',
      otherKey: 'bookId',
      foreignKey: 'recipeId'
    }

    Recipe.belongsToMany(models.Book, columnMapping);
    Recipe.belongsTo(models.User, { foreignKey: 'userId' });
  };

  Recipe.createNewRecipe = async function (createRecipeData) {
    // const { instruction, ingredients, url, title } = signUpData;
    const recipe = await Recipe.create(createRecipeData);
    return await Recipe.findByPk(recipe.id);
  };

  return Recipe;
};
