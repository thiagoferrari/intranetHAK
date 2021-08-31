import Sequelize, { Model } from 'sequelize';

class Empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.STRING,
        dsEmpresa: Sequelize.STRING,
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
