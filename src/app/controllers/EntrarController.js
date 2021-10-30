import Usuario from '../models/Login'
import * as Yup from 'yup'


/*FALTA VALIDAR SE O USER ESTÁ ATIVO OU NAO*/

class EntrarController {
	/* método store feito para verificar se o Entrar do Usuário esta OK */
	async login(req, res) {

		/* criando schema para Yup */
		const schema = Yup.object().shape({
			stAtivo: Yup.boolean().required(),
			dsLogin: Yup.string().required(),
			dsSenha: Yup.string().required(),
		})

		/* comparando schema com req.body */
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
		}

		const { dsLogin, dsSenha } = req.body

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
		const { id, dsEmail } = dadosDB

		return res.json({
			Logado: {
				id,
				dsLogin,
				dsEmail,
			}
		})
	}
	
}

export default new EntrarController()