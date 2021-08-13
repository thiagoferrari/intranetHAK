import Usuario from "../models/Usuario";

class UsuarioController {
  /* padrão: store é usado para gravar (CRIAR LOGIN) */
  async store(req, res) {
    /* select no DB procurando se já existe login cadastrado */
    const login = await Usuario.findOne({ where: { dsLogin: req.body.dsLogin } })

    /* verificando :*/
    if (login) {
      return res.status(400).json({ error: 'Este login inserido já foi criado' })
    }

    /* se passar roda um cria o Usuario, mediante Model, com os dados da req */
    const { id, dsLogin, dsEmail } = await Usuario.create(req.body)

    /* retornando o que foi inserido */
    return res.json({ id, dsLogin, dsEmail })
  }


  /* update destinado a mudar tudo o que o usuário quer: */
  async update(req, res) {
    const { dsLogin, dsSenha, id, senhaAntiga } = req.body;

    const dadosDB = await Usuario.findByPk(id);

    if (dadosDB.dsLogin !== dsLogin) { // se o login atual é !== do novo(a trocar), quer dizer que o user quer trocar
      const loginExistente = await Usuario.findOne({ // então procurar no DB se já existe algum igual esse novo
        where: { dsLogin },
      })

      if (loginExistente) {
        return res.status(400).json({ error: 'O novo login escolhido já existe, tente novamente' })
      }
    }

    // só faço isso se ele informou a senha antiga, isto é, quer alterar a senha
    if (dsSenha && !(dadosDB.dsSenha === senhaAntiga)) {
      return res.status(401).json({ error: 'A senha inserida não condiz com a presente no DB, tente novamente' })
    }

    /* se não parar em nenhum if, dar update: */
    await dadosDB.update(req.body)

    return res.json({ id, dsLogin, dsSenha })
  }
}

export default new UsuarioController()