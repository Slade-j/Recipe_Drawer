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

  Book.createNewBook = async function (data) {
    const book = await Book.create(data);
    return await Book.findByPk(book.id);
  };

  Book.getByLimit = async function (data) {
    const { offset, limit, id } = data;
    const recipes = await Book.findAll({
      where: { id },
      include: models.Recipe,
      offset,
      limit
    });
    return recipes;
  };

  return Book;
};
