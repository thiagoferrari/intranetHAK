import Ramal from "../models/Ramal";
import Setor from "../models/Setor";
import * as Yup from 'yup'

class RamalController {
  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      nrRamal: Yup.string().required(),
      stWhatsapp: Yup.string().required(),
      idSetor: Yup.number().required(),
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    /* select no DB procurando se já existe o ramal cadastrado */
    const ramalExistente = await Ramal.findAll({
      where: { nrRamal: req.body.nrRamal }
    })

    const createFeito = await Ramal.create(req.body)

    if (ramalExistente.length) {
      createFeito.dataValues.ramalExistente = 'S'
    }

    return res.json(createFeito)
  }


  async update(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      nrRamal: Yup.string().required(),
      stWhatsapp: Yup.string().required(),
      dsObservacao: Yup.string(),
      idColaborador: Yup.number().required(),
      idSetor: Yup.number().required(),
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { id, nrRamal } = req.body

    const dadosDB = await Ramal.findByPk(id)

    const ramalExistente = await Ramal.findAll({
      where: { nrRamal }
    })

    const updateFeito = await dadosDB.update(req.body)

    if (ramalExistente.length) {
      updateFeito.dataValues.ramalExistente = 'S'
    }

    return res.json(updateFeito)
  }
}

export default new RamalController()