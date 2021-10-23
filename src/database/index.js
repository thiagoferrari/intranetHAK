import Sequelize from 'sequelize';

import Login from '../app/models/Login';
import Empresa from '../app/models/Empresa';
import Setor from '../app/models/Setor';
import Colaborador from '../app/models/Colaborador';
import Ramal from '../app/models/Ramal';
import logDelete from '../app/models/logDelete';
import Comunicado from '../app/models/Comunicado';
import Sugestao from '../app/models/Sugestao';
import Politica from '../app/models/Politica';
import Pabx from '../app/models/Pabx';

import dbConfig from '../config/database';

const models = [Ramal, Colaborador, Login,
	Empresa, Setor, logDelete, Comunicado, Sugestao,
	Politica, Pabx]

class Database {
	constructor() {
		this.init()
	}

	init() {
		this.connection = new Sequelize(dbConfig)

		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models))
	}
}

export default new Database();