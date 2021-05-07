'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    title: DataTypes.STRING,
    bookId: DataTypes.INTEGER
  }, {});
  Section.associate = function(models) {

    const columnMapping = {
      through: 'Recipe_section',
      otherKey: 'recipeId',
      foreignKey: 'sectionId'
    }

    Section.belongsToMany(models.Recipe, columnMapping);
    Section.belongsTo(models.Book, { foreignKey: 'bookId' });
  };
  return Section;
};
