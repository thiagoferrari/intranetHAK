'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comunicado', {
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
      dsComunicado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      arqComunicado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      imgComunicado: {
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
    return queryInterface.dropTable('Comunicado');
  },
};