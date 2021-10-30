'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Login', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      stAtivo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      dsLogin: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      dsEmailRec: { //dsEmailRecuperação
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsSenha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Login');
  },
};