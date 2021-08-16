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
      dsColaborador: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stDemitdo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      empresaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { // RELACIONAMENTO
          model: 'Empresa',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      departamentoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { // RELACIONAMENTO
          model: 'Departamento',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('Colaborador');
  },
};