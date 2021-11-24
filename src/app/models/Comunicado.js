import Sequelize, { Model } from 'sequelize';

class Comunicado extends Model {
  static init(sequelize) {
    super.init(
      {
        stAtivo: Sequelize.BOOLEAN,
        dsTitulo: Sequelize.STRING,
        dsComunicado: Sequelize.STRING,
        /* idImg: Sequelize.INTEGER,
        idDoc: Sequelize.INTEGER, */
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Anexo, { foreignKey: 'idDoc', as: 'fkDoc' })
    this.belongsTo(models.Anexo, { foreignKey: 'idImg', as: 'fkImg' })
  }
}

export default Comunicado;
