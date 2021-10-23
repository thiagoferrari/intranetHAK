import Sequelize, { Model } from 'sequelize';

class Pabx extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.STRING,
        dsTitulo: Sequelize.STRING,
        dsInstrucao: Sequelize.STRING,
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

export default Pabx;
