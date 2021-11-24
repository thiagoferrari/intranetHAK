'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Documento', {
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
      dsTitulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsDocumento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      arqDocumento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      imgDocumento: {
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
    return queryInterface.dropTable('Documento');
  },
};