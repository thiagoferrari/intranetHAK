import Colaborador from "../models/Colaborador";
import * as Yup from 'yup'
import Empresa from "../models/Empresa";
import Setor from "../models/Setor";

class ColaboradorController {
  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.string().required(),
      dsColaborador: Yup.string().required(),
      dsEmail: Yup.string().email().required(),
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
      dsColaborador: Yup.string().required(),
      stAtivo: Yup.string().required()
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
    const todosColaboradores = await Colaborador.findAll({
      where: { stAtivo: 'S' },
      attributes: ['id', 'dsColaborador', 'dsEmail',],
      include:
        [{
          model: Empresa,
          as: 'fkEmpresa',
          attributes: ['dsEmpresa']
        }, {
          model: Setor,
          as: 'fkSetor',
          attributes: ['dsSetor']
        }],
      order: ['dsColaborador']
    })

    return res.json(todosColaboradores)
  }

  async show(req, res) {
    const id = req.params.id

    const umColaborador = await Colaborador.findOne({
      where: { id },
      attributes: ['id', 'dsColaborador', 'dsEmail'],
      include:
        [{
          model: Empresa,
          as: 'fkEmpresa',
          attributes: ['dsEmpresa']
        }, {
          model: Setor,
          as: 'fkSetor',
          attributes: ['dsSetor']
        }],
    })

    return res.json(umColaborador)
  }
}

export default new ColaboradorController()