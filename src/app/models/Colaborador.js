import Sequelize, { Model } from 'sequelize';

class Colaborador extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.STRING,
        dsColaborador: Sequelize.STRING,
        idEmpresa: Sequelize.STRING,
        idSetor: Sequelize.STRING
      },
      {
        sequelize,
      }
    )

    return this
  }

 /*  static associate(models) {
    this.belongsTo(models.Empresa, { foreignKey: 'idEmpresa', as: 'Empresa' })
    this.belongsTo(models.Setor, { foreignKey: 'idSetor', as: 'Setor' })
  } */
}

export default Colaborador;
