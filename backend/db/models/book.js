'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {

    const columnMapping = {
      through: 'Recipe_book',
      otherKey: 'recipeId',
      foreignKey: 'bookId'
    }

    Book.belongsToMany(models.Recipe, columnMapping);
    Book.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Book;
};
