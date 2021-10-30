import Sequelize, { Model } from 'sequelize';

class Setor extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.BOOLEAN,
        dsSetor: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Empresa, { foreignKey: 'idEmpresa', as: 'fkEmpresa' })
  }
}

export default Setor;
