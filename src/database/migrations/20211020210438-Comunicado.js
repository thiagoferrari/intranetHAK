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
        type: Sequelize.BOOLEAN,
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
      idImg: {
        type: Sequelize.INTEGER,
        references: { model: 'Anexo', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      idDoc: {
        type: Sequelize.INTEGER,
        references: { model: 'Anexo', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
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