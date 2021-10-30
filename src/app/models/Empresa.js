import Sequelize, { Model } from 'sequelize';

class Empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.BOOLEAN,
        nmFantasia: Sequelize.STRING,
        dsRazaoSocial: Sequelize.STRING,
        cdCNPJ: Sequelize.STRING,
        dsInscricaoEstMun: Sequelize.STRING,
        cdCEP: Sequelize.STRING,
        dsEndereco: Sequelize.STRING,
        dsEmail: Sequelize.STRING,
        dsEmailNFE: Sequelize.STRING,
        urlInstagram: Sequelize.STRING,
        urlFacebook: Sequelize.STRING,
        urlSite: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
  }
}

export default Empresa;
