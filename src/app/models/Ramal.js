import Sequelize, { Model } from 'sequelize'

class Ramal extends Model {
  static init(sequelize) {
    super.init(
      {
        nrRamal: Sequelize.STRING,
        stWhatsapp: Sequelize.STRING,
        dsObservacao: Sequelize.STRING,

        /* // foreignKey:
        idColaborador: Sequelize.INTEGER,
        idSetor: Sequelize.INTEGER */
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Colaborador, { foreignKey: 'idColaborador', as: 'Colaborador' })
    this.belongsTo(models.Setor, { foreignKey: 'idSetor', as: 'Setor' })
  }
}

export default Ramal