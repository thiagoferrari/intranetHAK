import Sugestao from "../models/Sugestao"
import logDelete from "../models/logDelete"
import * as Yup from 'yup'

class SugestaoController {

  async store(req, res) {
    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsSugestao: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { stAtivo, nmPessoa, dsSugestao } = await Sugestao.create(req.body)

    return res.json({ stAtivo, nmPessoa, dsSugestao })
  }



  async update(req, res) {
    /* nao fazer nada */

    return res.json({ id, stAtivo, nmPessoa, dsSugestao })
  }



  async index(req, res) {
    const verSugestoes = await Sugestao.findAll({
      attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
      order: ['dsSugestao']
    })

    return res.json(verSugestoes)
  }


  async show(req, res) {
    const { id } = req.params

    const verSugestao = await Sugestao.findAll({
      where: { id },
      attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
      order: ['dsSugestao']
    })

    return res.json(verSugestao)
  }



  async delete(req, res) {
    /* nao fazer nada */

    return res.json({ id, stAtivo, nmPessoa, dsSugestao })
  }
}

export default new SugestaoController()