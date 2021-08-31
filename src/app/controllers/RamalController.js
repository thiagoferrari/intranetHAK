import Ramal from "../models/Ramal";
import * as Yup from 'yup'
import { Op } from "sequelize";
import Colaborador from "../models/Colaborador";
import Setor from "../models/Setor";


class RamalController {
  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.string().required(),
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
      stAtivo: Yup.string().required(),
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
      where: {
        nrRamal,
        id: { [Op.ne]: id },
      },
    })

    const updateFeito = await dadosDB.update(req.body)

    if (ramalExistente.length) {
      updateFeito.dataValues.ramalExistente = 'S'
    }

    return res.json(updateFeito)
  }

  async index(req, res) {
    const todosRamais = await Ramal.findAll({
      where: { stAtivo: 'S' },
      attributes: ['id', 'nrRamal', 'stWhatsapp', 'dsObservacao',],
      include:
        [{
          model: Colaborador,
          as: 'fkColaborador',
          attributes: ['dsColaborador']
        }, {
          model: Setor,
          as: 'fkSetor',
          attributes: ['dsSetor']
        }],
      order: ['nrRamal']
    })

    return res.json(todosRamais)
  }


  async show(req, res) {
    const id = req.params.id

    const umRamal = await Ramal.findOne({
      where: { stAtivo: 'S', id },
      attributes: ['id', 'nrRamal', 'stWhatsapp', 'dsObservacao'],
      include:
        [{
          model: Colaborador,
          as: 'fkColaborador',
          attributes: ['dsColaborador']
        }, {
          model: Setor,
          as: 'fkSetor',
          attributes: ['dsSetor']
        }],
    })

    return res.json(umRamal)
  }
}

export default new RamalController()