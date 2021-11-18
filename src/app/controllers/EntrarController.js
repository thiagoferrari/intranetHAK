import Login from '../models/Login'
import * as Yup from 'yup'
const nodemailer = require('nodemailer')


/*FALTA VALIDAR SE O USER ESTÁ ATIVO OU NAO*/

class EntrarController {
	/* método store feito para verificar se o Entrar do Usuário esta OK */
	async login(req, res) {
		const { dsLogin, dsSenha, tryRec } = req.body

		console.log('tryRec :>> ', tryRec);

		if (tryRec) { // tentar recuperar senha
			const dadosDB = await Login.findOne({
				where: { dsLogin, stAtivo: true },
				attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
			})

			/* se não encontrar nenhum login: */
			if (!dadosDB) {
				return res.status(401).json({ error: 'Login não existente ou inativado' })
			}

			/* se encontrar login: */
			const { dsEmailRec } = dadosDB

			let transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 587,
				secure: false,
				auth: {
					user: "intranet.kardec@gmail.com",
					pass: "Kardec@2021"
				},
				tls: {
					rejectUnauthorized: false
				}
			})

			transporter.sendMail({
				from: 'Intranet Kardec <intranet.kardec@gmail.com>',
				to: dsEmailRec,
				subject: 'Recuperação de senha',
				text: `Sua senha é: ${dsSenha}`,
				html: `<p>Sua senha é: ${dsSenha}</p>`
			})
				.then(info => { console.log('Email enviado com sucesso!:', info) })
				.catch(err => { console.log('Erro ao enviar email!:', err) })

			console.log('dsEmailRec :>> ', dsEmailRec);
			return res.json({ 'msg': `senha enviada para: ${dsEmailRec}` })



		} else { // login normal:
			/* select no banco procurando esse login */
			const dadosDB = await Login.findOne({ where: { dsLogin, stAtivo: true } })

			/* se não encontrar nenhum login: */
			if (!dadosDB) {
				return res.status(401).json({ error: 'Login não existente ou inativado' })
			}

			/* se a senha estiver errada: */
			if (dadosDB.dsSenha !== dsSenha) {
				return res.status(401).json({ error: 'Senha incorreta.' })
			}

			/* ao final, mostrar o que foi passado no request (exeto senha): */
			const { id, dsEmailRec } = dadosDB

			return res.json({
				Logado: {
					id,
					dsLogin,
					dsEmailRec,
				}
			})
		}
	}

}

export default new EntrarController()