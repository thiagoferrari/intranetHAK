import Login from "../models/Login"
import logDelete from "../models/logDelete"
import * as Yup from 'yup'

class LoginController {

  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsLogin: Yup.string().required(),
      dsEmailRec: Yup.string().email().required(),
      dsSenha: Yup.string().required(),
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    /* select no DB procurando se já existe login cadastrado */
    const login = await Login.findOne({ where: { dsLogin: req.body.dsLogin } })

    /* verificando :*/
    if (login) {
      return res.status(400).json({ error: 'Este login inserido já foi criado' })
    }

    /* se passar, roda um create Login, mediante Model, com os dados da req */
    const { id, dsLogin, dsEmailRec } = await Login.create(req.body)

    /* retornando o que foi inserido */
    return res.json({ id, dsLogin, dsEmailRec })
  }



  /* update destinado a mudar tudo o que o usuário quer: */
  async update(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsLogin: Yup.string().required(),
      dsEmailRec: Yup.string().email().required(),
      dsSenhaAntiga: Yup.string(),
      dsSenha: Yup.string()
        .when('dsSenhaAntiga', (dsSenhaAntiga, field) =>
          dsSenhaAntiga ? field.required() : field),
      /* quando a dsSenhaAntiga for preenchida 
      dsSenha se torna obrigatória - field.required() */
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { id, dsLogin, dsSenha, dsSenhaAntiga } = req.body;

    const dadosDB = await Login.findByPk(id);

    // se o login atual é !== do novo(a trocar), quer dizer que o user quer trocar
    if (dadosDB.dsLogin !== dsLogin) {

      // então procurar no DB se já existe algum igual esse novo
      const loginExistente = await Login.findOne({
        where: { dsLogin }
      })

      if (loginExistente) {
        return res.status(400).json({ error: 'O novo login escolhido já existe, tente novamente' })
      }
    }

    // só faço isso se ele informou a senha antiga, isto é, quer alterar a senha
    if (dsSenhaAntiga) {

      if (dadosDB.dsSenha !== dsSenhaAntiga) {
        return res.status(401).json({ error: 'A senha inserida não condiz com a presente no DB, tente novamente' })
      }

    }

    /* se não parar em nenhum if, dar update: */
    await dadosDB.update(req.body)

    return res.json({ id, dsLoginNovo: dsLogin, dsSenhaNova: dsSenha })
  }



  async index(req, res) {
    const verLogins = await Login.findAll({
      attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
      order: ['dsLogin']
    })

    return res.json(verLogins)
  }


  async show(req, res) {
    const { id } = req.params

    const verSetor = await Login.findAll({
      where: { id },
      attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
      order: ['dsLogin']
    })

    return res.json(verSetor)
  }



  async delete(req, res) {
    const { id } = req.params

    const aDeletar = await Login.findByPk(id)

    let dadosDeletados = {
      dsTabela: aDeletar.constructor.name,
      dsDados: JSON.stringify(aDeletar.dataValues)
    }

    await logDelete.create(dadosDeletados)

    await aDeletar.destroy()

    return res.json(aDeletar)
  }
}

export default new LoginController()