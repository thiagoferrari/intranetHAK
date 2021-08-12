import Acesso from "../models/Acesso";

class AcessoController {
	/* padrão: store é usado para gravar */
	async store(req, res) {
		/* select no DB procurando se já existe login cadastrado */
		const loginRepetido = await Acesso.findOne({ where: { ds_login: req.body.ds_login } })

		/* verificando :*/
		if (loginRepetido) {
			return res.status(400).json({ error: 'Este login inserido já foi criado' })
		}

		/* se passar roda um create linha, mediante Model, com os dados da req */
		const { id, ds_login, ds_email } = await Acesso.create(req.body)

		/* retornando o que foi inserido */
		return res.json({ id, ds_login, ds_email })
	}
}

export default new AcessoController()