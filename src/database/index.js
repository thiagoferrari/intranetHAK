import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Usuario from '../app/models/Usuario';
import Empresa from '../app/models/Empresa';
import Setor from '../app/models/Setor';
import Colaborador from '../app/models/Colaborador';
import Ramal from '../app/models/Ramal';

const models = [Usuario, Empresa, Setor, Colaborador, Ramal];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig)

		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models))
	}
}

export default new Database();