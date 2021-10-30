import Sequelize, { Model } from 'sequelize';

class Colaborador extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.BOOLEAN,
        dsColaborador: Sequelize.STRING,
        dsEmail: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Setor, { foreignKey: 'idSetor', as: 'fkSetor' })
  }
}

export default Colaborador;