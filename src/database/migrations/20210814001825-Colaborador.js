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
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsColaborador: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idEmpresa: { // RELACIONAMENTO
        type: Sequelize.INTEGER,
        references: { model: 'Empresa', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      idSetor: { // RELACIONAMENTO
        type: Sequelize.INTEGER,
        references: { model: 'Setor', key: 'id' },
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