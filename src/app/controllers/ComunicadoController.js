import Comunicado from "../models/Comunicado"
import logDelete from "../models/logDelete"
import * as Yup from 'yup'

class ComunicadoController {

  async store(req, res) {
    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsTitulo: Yup.string().required(),
      dsComunicado: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { stAtivo, dsTitulo, dsComunicado } = await Comunicado.create(req.body)

    return res.json({ stAtivo, dsTitulo, dsComunicado })
  }



  async update(req, res) {
    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsTitulo: Yup.string().required(),
      dsComunicado: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { id, stAtivo, dsTitulo, dsComunicado } = req.body;

    const dadosDB = await Comunicado.findByPk(id);

    await dadosDB.update(req.body)

    return res.json({ id, stAtivo, dsTitulo, dsComunicado })
  }



  async index(req, res) {
    const verComunicados = await Comunicado.findAll({
      attributes: ['id', 'stAtivo', 'dsTitulo', 'dsComunicado'],
      order: ['dsTitulo']
    })

    return res.json(verComunicados)
  }


  async show(req, res) {
    const { id } = req.params

    const verComunicado = await Comunicado.findOne({
      where: { id },
      attributes: ['id', 'stAtivo', 'dsTitulo', 'dsComunicado'],
      order: ['dsTitulo']
    })

    return res.json(verComunicado)
  }



  async delete(req, res) {
    const { id } = req.params

    const aDeletar = await Comunicado.findByPk(id)

    let dadosDeletados = {
      dsTabela: aDeletar.constructor.name,
      dsDados: JSON.stringify(aDeletar.dataValues)
    }

    await logDelete.create(dadosDeletados)

    await aDeletar.destroy()

    return res.json(aDeletar)
  }
}

export default new ComunicadoController()