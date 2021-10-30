'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Colaborador', {
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
      dsEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dsColaborador: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idSetor: { // RELACIONAMENTO
        type: Sequelize.INTEGER,
        references: { model: 'Setor', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('Colaborador');
  },
};