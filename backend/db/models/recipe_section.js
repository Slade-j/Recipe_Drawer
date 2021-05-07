'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe_section = sequelize.define('Recipe_section', {
    recipeId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER
  }, {});
  Recipe_section.associate = function(models) {
    // associations can be defined here
  };
  return Recipe_section;
};