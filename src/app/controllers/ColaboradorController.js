import Colaborador from "../models/Colaborador";
import logDelete from "../models/logDelete"
import * as Yup from 'yup'
import Setor from "../models/Setor";

class ColaboradorController {
  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsColaborador: Yup.string().required(),
      dsEmail: Yup.string(),
      idSetor: Yup.number().required()
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const createRodado = await Colaborador.create(req.body)

    /* retornando o que foi inserido */
    return res.json(createRodado)
  }



  async update(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsColaborador: Yup.string().required(),
      dsEmail: Yup.string(),
      idSetor: Yup.number().required()
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { id } = req.body;

    const dadosDB = await Colaborador.findByPk(id);

    const updateRodado = await dadosDB.update(req.body)

    return res.json(updateRodado)
  }



  async index(req, res) {
    const verColaboradores = await Colaborador.findAll({
      attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
      include:
        [{
          model: Setor,
          as: 'fkSetor',
          attributes: ['dsSetor']
        }],
      order: ['dsColaborador']
    })

    return res.json(verColaboradores)
  }



  async show(req, res) {
    const { id } = req.params

    const verColaborador = await Colaborador.findOne({
      where: { id },
      attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
      include:
        [{
          model: Setor,
          as: 'fkSetor',
          attributes: ['id', 'dsSetor']
        }],
    })

    return res.json(verColaborador)
  }



  async delete(req, res) {
    const { id } = req.params

    const aDeletar = await Colaborador.findByPk(id)

    let dadosDeletados = {
      dsTabela: aDeletar.constructor.name,
      dsDados: JSON.stringify(aDeletar.dataValues)
    }

    await logDelete.create(dadosDeletados)

    await aDeletar.destroy()

    return res.json(aDeletar)
  }
}

export default new ColaboradorController()