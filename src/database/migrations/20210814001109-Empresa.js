'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Empresa', {
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
      nmFantasia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsRazaoSocial: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cdCNPJ: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsInscricaoEstMun: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cdCEP: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsEndereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dsEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dsEmailNFE: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      urlInstagram: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      urlFacebook: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      urlSite: {
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
    return queryInterface.dropTable('Empresa');
  },
};