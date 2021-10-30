import Pabx from "../models/Pabx";
import logDelete from "../models/logDelete"
import * as Yup from 'yup'
import { Op } from "sequelize";

class PabxController {
  async store(req, res) {

    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsTitulo: Yup.string().required(),
      dsInstrucao: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const createFeito = await Pabx.create(req.body)

    return res.json(createFeito)
  }



  async update(req, res) {

    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsTitulo: Yup.string().required(),
      dsInstrucao: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const dadosDB = await Pabx.findByPk(req.body.id)

    const updateFeito = await dadosDB.update(req.body)

    return res.json(updateFeito)
  }



  async index(req, res) {
    const verPabxs = await Pabx.findAll({
      attributes: ['id', 'dsTitulo', 'dsInstrucao'],
      order: ['dsTitulo']
    })

    return res.json(verPabxs)
  }



  async show(req, res) {
    const { id } = req.params

    const verPabx = await Pabx.findOne({
      where: { id },
      attributes: ['id', 'dsTitulo', 'dsInstrucao'],
      order: ['dsTitulo']
    })

    return res.json(verPabx)
  }



  async delete(req, res) {
    const { id } = req.params

    const aDeletar = await Pabx.findByPk(id)

    let dadosDeletados = {
      dsTabela: aDeletar.constructor.name,
      dsDados: JSON.stringify(aDeletar.dataValues)
    }

    await logDelete.create(dadosDeletados)

    await aDeletar.destroy()

    return res.json(aDeletar)
  }
}

export default new PabxController()