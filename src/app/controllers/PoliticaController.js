import Politica from "../models/Politica";
import logDelete from "../models/logDelete"
import * as Yup from 'yup'
import { Op } from "sequelize";

class PoliticaController {
  async store(req, res) {

    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsTitulo: Yup.string().required(),
      dsResumo: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const createFeito = await Politica.create(req.body)

    return res.json(createFeito)
  }



  async update(req, res) {

    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsTitulo: Yup.string().required(),
      dsResumo: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const dadosDB = await Politica.findByPk(req.body.id)

    const updateFeito = await dadosDB.update(req.body)

    return res.json(updateFeito)
  }



  async index(req, res) {
    const verPoliticas = await Politica.findAll({
      attributes: ['id', 'dsTitulo', 'dsResumo'],
      order: ['dsTitulo']
    })

    return res.json(verPoliticas)
  }



  async show(req, res) {
    const { id } = req.params

    const verPolitica = await Politica.findOne({
      where: { id },
      attributes: ['id', 'dsTitulo', 'dsResumo'],
      order: ['dsTitulo']
    })

    return res.json(verPolitica)
  }



  async delete(req, res) {
    const { id } = req.params

    const aDeletar = await Politica.findByPk(id)

    let dadosDeletados = {
      dsTabela: aDeletar.constructor.name,
      dsDados: JSON.stringify(aDeletar.dataValues)
    }

    await logDelete.create(dadosDeletados)

    await aDeletar.destroy()

    return res.json(aDeletar)
  }
}

export default new PoliticaController()