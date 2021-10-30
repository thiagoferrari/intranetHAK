import Sequelize, { Model } from 'sequelize';

class Politica extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.BOOLEAN,
        dsTitulo: Sequelize.STRING,
        dsResumo: Sequelize.STRING,
        arqRegra: Sequelize.STRING,
        imgRegra: Sequelize.STRING,
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

export default Politica;
