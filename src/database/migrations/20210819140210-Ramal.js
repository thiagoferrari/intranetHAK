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
      nrRamal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stWhatsapp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsObservacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idColaborador: { // RELACIONAMENTO
        type: Sequelize.INTEGER,
        references: { model: 'Colaborador', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        // permitir null, alguns ramais não em funcionário em expecífico
      },
      idSetor: { // RELACIONAMENTO
        type: Sequelize.INTEGER,
        references: { model: 'Setor', key: 'id' },
        onUpdate: 'CASCADE',
        //onDelete: 'SET NULL',
        allowNull: false,
        // todos precisam ter, para se organizarem na lista de ramais
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