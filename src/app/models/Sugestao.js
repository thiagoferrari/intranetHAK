import Sequelize, { Model } from 'sequelize';

class Sugestao extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.STRING,
        dsSugestao: Sequelize.STRING,
        nmPessoa: Sequelize.STRING,
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

export default Sugestao;
