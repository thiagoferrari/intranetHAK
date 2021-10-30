import Ramal from "../models/Ramal";
import logDelete from "../models/logDelete"
import * as Yup from 'yup'
import { Op } from "sequelize";
import Colaborador from "../models/Colaborador";
import Setor from "../models/Setor";

class RamalController {
  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      nrRamal: Yup.string().required(),
      stWhatsapp: Yup.string().required(),
      //dsObservacao: Yup.string(),
      //idColaborador: Yup.number(),
      idSetor: Yup.number().required(),
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    /* puxar auto. o setor caso o idColaborador for informado: */
    if (req.body.idColaborador) {

      let idSetorColab = await Colaborador
        .findOne({
          where: {
            id: req.body.idColaborador
          },
          attributes: ['idSetor']
        })

      console.log('idSetorColab :>>', idSetorColab.dataValues.idSetor);

      req.body.idSetor = idSetorColab.dataValues.idSetor

      console.log('req.body.idSetor :>> ', req.body);
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
      stAtivo: Yup.boolean().required(),
      nrRamal: Yup.string().required(),
      stWhatsapp: Yup.string().required(),
      //dsObservacao: Yup.string(),
      //idColaborador: Yup.number(),
      idSetor: Yup.number().required(),
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    /* puxar auto. o setor caso o idColaborador for informado: */
    if (req.body.idColaborador) {

      let idSetorColab = await Colaborador
        .findOne({
          where: {
            id: req.body.idColaborador
          },
          attributes: ['idSetor']
        })

      console.log('idSetorColab :>>', idSetorColab.dataValues.idSetor);

      req.body.idSetor = idSetorColab.dataValues.idSetor

      console.log('req.body.idSetor :>> ', req.body);
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
    const verRamais = await Ramal.findAll({
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

    return res.json(verRamais)
  }



  async show(req, res) {
    const { id } = req.params

    const verRamal = await Ramal.findOne({
      where: { id },
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

    return res.json(verRamal)
  }


  
  async delete(req, res) {
    const { id } = req.params

    const aDeletar = await Ramal.findByPk(id)

    let dadosDeletados = {
      dsTabela: aDeletar.constructor.name,
      dsDados: JSON.stringify(aDeletar.dataValues)
    }

    await logDelete.create(dadosDeletados)

    await aDeletar.destroy()

    return res.json(aDeletar)
  }
}

export default new RamalController()