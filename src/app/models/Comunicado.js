import Sequelize, { Model } from 'sequelize';

class Comunicado extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.BOOLEAN,
        dsTitulo: Sequelize.STRING,
        dsComunicado: Sequelize.STRING,
        arqComunicado: Sequelize.STRING,
        imgComunicado: Sequelize.STRING,
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

export default Comunicado;
