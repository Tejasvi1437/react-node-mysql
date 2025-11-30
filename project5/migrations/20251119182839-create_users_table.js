'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id:{
          type:Sequelize.INTEGER(11),
          allowNull:false,
          primaryKey:true,
          autoIncrement:true
          },
      username:{
          type:Sequelize.STRING(50),
          allowNull:false,
          unique:true
          },
      passed:{
          type:Sequelize.STRING(20),
          allowNull:false
          },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tweets');
  }
};
