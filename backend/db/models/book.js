'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    Book.belongsTo(models.User, { foreignKey: 'userId' });
    Book.hasMany(models.Section, { foreignKey: 'bookId' });
  };
  return Book;
};
