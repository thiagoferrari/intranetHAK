import Sequelize, { Model } from 'sequelize';

class Anexo extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				path: Sequelize.STRING,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `http://localhost:3333/MDWRAnexo/${this.path}`
					}
				}
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

export default Anexo;