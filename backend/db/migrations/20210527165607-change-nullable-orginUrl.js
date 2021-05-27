'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return Promise.all([
      queryInterface.changeColumn('Recipes', 'originUrl', {
        type: Sequelize.STRING(255),
        allowNull: true
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Recipes', 'originUrl', {
        type: Sequelize.STRING(255),
        allowNull: false
      }),
    ]);
  }
};
