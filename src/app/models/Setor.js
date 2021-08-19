import Sequelize, { Model } from 'sequelize';

class Setor extends Model {
  static init(sequelize) {
    super.init(
      {
        dsSetor: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Setor;
