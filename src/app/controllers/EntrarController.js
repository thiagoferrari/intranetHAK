import Usuario from '../models/Usuario';

class EntrarController {
	async store(req, res) {
		const { dsLogin, dsSenha } = req.body;

		/* select no banco procurando esse login */
		const dadosDB = await Usuario.findOne({ where: { dsLogin } })

		/* se não encontrar nenhum login: */
		if (!dadosDB) {
			return res.status(401).json({ error: 'Login não existente' })
		}

		/* se a senha estiver errada: */
		if (dadosDB.dsSenha !== dsSenha) {
			return res.status(401).json({ error: 'Senha incorreta.' })
		}

		/* ao final, mostrar o que foi passado no request (exeto senha): */
		const { id, dsEmail } = dadosDB;

		return res.json({
			usuario: {
				id,
				dsLogin,
				dsEmail,
			}
		})
	}
}

export default new EntrarController();