import Sequelize, { Model } from 'sequelize';

class Ramal extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.STRING,
        dsRamal: Sequelize.STRING,
        idEmpresa: Sequelize.STRING,
        idSetor: Sequelize.STRING
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default Ramal;
