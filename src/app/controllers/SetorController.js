import Setor from "../models/Setor";
import Empresa from "../models/Empresa";
import logDelete from "../models/logDelete"
import * as Yup from 'yup'

class SetorController {
  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsSetor: Yup.string().required(),
      idEmpresa: Yup.number().required()
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { dsSetor } = await Setor.create(req.body)

    /* retornando o que foi inserido */
    return res.json({ dsSetor })
  }



  async update(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      dsSetor: Yup.string().required(),
      idEmpresa: Yup.number().required()
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { id, dsSetor } = req.body;

    const dadosDB = await Setor.findByPk(id);

    await dadosDB.update(req.body)

    return res.json({ dsSetorNovo: dsSetor })
  }



  async index(req, res) {
    const verSetores = await Setor.findAll({
      attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
      include:
        [{
          model: Empresa,
          as: 'fkEmpresa',
          attributes: ['nmFantasia']
        }],
      order: ['dsSetor']
    })

    return res.json(verSetores)
  }



  async show(req, res) {
    const { id } = req.params

    const verSetor = await Setor.findAll({
      where: { id },
      attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
      include:
        [{
          model: Empresa,
          as: 'fkEmpresa',
          attributes: ['nmFantasia']
        }],
      order: ['dsSetor']
    })

    return res.json(verSetor)
  }



  async delete(req, res) {
    const { id } = req.params

    const aDeletar = await Setor.findByPk(id)

    let dadosDeletados = {
      dsTabela: aDeletar.constructor.name,
      dsDados: JSON.stringify(aDeletar.dataValues)
    }

    try {
      await aDeletar.destroy()
    } catch (error) {
      return res.status(502).json({
        error: `Não foi possível deletar este Setor,
      pois existem registros Filhos localizados na tabela ${error.original.table}`
      })
    }

    await logDelete.create(dadosDeletados)
    return res.json(aDeletar)
  }
}

export default new SetorController()