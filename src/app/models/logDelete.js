import Sequelize, { Model } from 'sequelize';

class logDelete extends Model {
  static init(sequelize) {
    super.init(
      {
        dsTabela: Sequelize.STRING,
        dsDados: Sequelize.STRING
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

export default logDelete;
