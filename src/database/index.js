import Sequelize from 'sequelize';
import Acesso from '../app/models/Acesso';
import databaseConfig from '../config/database';

const models = [Acesso];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		models.map(model => model.init(this.connection));
	}
}

export default new Database();