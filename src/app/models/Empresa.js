import Sequelize, { Model } from 'sequelize';

class Empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        dsEmpresa: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Empresa;
