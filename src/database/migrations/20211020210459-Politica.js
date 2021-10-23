'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Politica', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      stAtivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsTitulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsResumo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      arqRegra: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      imgRegra: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('Politica');
  },
};