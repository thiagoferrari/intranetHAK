import Sequelize, { Model } from 'sequelize';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        dsLogin: Sequelize.STRING,
        dsEmail: Sequelize.STRING,
        dsSenha: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Usuario;