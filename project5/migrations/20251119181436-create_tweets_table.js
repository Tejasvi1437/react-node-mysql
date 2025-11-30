'use strict';


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tweets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content : Sequelize.STRING(300),
      userId:Sequelize.INTEGER(11),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE      
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tweets');
  }
};
