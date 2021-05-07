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
      through: 'Recipe_section',
      otherKey: 'sectionId',
      foreignKey: 'recipeId'
    }

    Recipe.belongsToMany(models.Section, columnMapping);
    Recipe.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Recipe;
};
