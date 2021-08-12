import Sequelize, { Model } from 'sequelize';

class Acesso extends Model {
  static init(sequelize) {
    super.init(
      {
        ds_login: Sequelize.STRING,
        ds_email: Sequelize.STRING,
        ds_senha: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Acesso;
