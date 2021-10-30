import Sequelize, { Model } from 'sequelize'

class Ramal extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.BOOLEAN,
        nrRamal: Sequelize.STRING,
        stWhatsapp: Sequelize.STRING,
        dsObservacao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Colaborador, { foreignKey: 'idColaborador', as: 'fkColaborador' })
    this.belongsTo(models.Setor, { foreignKey: 'idSetor', as: 'fkSetor' })
  }
}

export default Ramal