import Sequelize, { Model } from 'sequelize';

class Colaborador extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.STRING,
        dsColaborador: Sequelize.STRING,

        // foreignKey:
        idEmpresa: Sequelize.INTEGER,
        idSetor: Sequelize.INTEGER
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Empresa, { foreignKey: 'idEmpresa', as: 'Empresa' })
    this.belongsTo(models.Setor, { foreignKey: 'idSetor', as: 'fkSetor' })
  }
}

export default Colaborador;
