'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ramal', {
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
      nrRamal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stWhatsapp: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      dsObservacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idColaborador: {
        type: Sequelize.INTEGER,
        references: { model: 'Colaborador', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true, // alguns ramais são gerais do setor
      },
      idSetor: {
        type: Sequelize.INTEGER,
        references: { model: 'Setor', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false, // obrigatório, para organização na lista de ramais
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
    return queryInterface.dropTable('Ramal');
  },
};