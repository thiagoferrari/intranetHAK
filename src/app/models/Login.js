import Sequelize, { Model } from 'sequelize';

class Login extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.STRING,
        dsLogin: Sequelize.STRING,
        dsEmailRec: Sequelize.STRING,
        dsSenha: Sequelize.STRING,
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

export default Login;
