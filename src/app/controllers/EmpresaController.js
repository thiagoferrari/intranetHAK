import Empresa from "../models/Empresa";
import logDelete from "../models/logDelete"
import * as Yup from 'yup'

class EmpresaController {
  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.string().required(),
      dsEmpresa: Yup.string().required(),
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { dsEmpresa } = await Empresa.create(req.body)

    /* retornando o que foi inserido */
    return res.json({ dsEmpresa })
  }


  
  async update(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      stAtivo: Yup.string().required(),
      dsEmpresa: Yup.string().required(),
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { id, dsEmpresa } = req.body;

    const dadosDB = await Empresa.findByPk(id);

    await dadosDB.update(req.body)

    return res.json({ dsEmpresaNovo: dsEmpresa })
  }



  async index(req, res) {
    const verEmpresas = await Empresa.findAll({
      where: { stAtivo: 'S' },
      attributes: ['id', 'dsEmpresa'],
      order: ['dsEmpresa']
    })

    return res.json(verEmpresas)
  }



  async show(req, res) {
    const { id } = req.params

    const verEmpresa = await Empresa.findAll({
      where: { stAtivo: 'S', id },
      attributes: ['id', 'dsEmpresa'],
      order: ['dsEmpresa']
    })

    return res.json(verEmpresa)
  }



  async delete(req, res) {
    const { id } = req.params

    const aDeletar = await Empresa.findByPk(id)

    let dadosDeletados = {
      dsTabela: aDeletar.constructor.name,
      dsDados: JSON.stringify(aDeletar.dataValues)
    }

    try {
      await aDeletar.destroy()
    } catch (error) {
      return res.status(502).json({
        error: `Não foi possível deletar esta Empresa, 
      pois existem registros Filhos localizados na tabela ${error.original.table}`
      })
    }

    await logDelete.create(dadosDeletados)
    return res.json(aDeletar)
  }
}

export default new EmpresaController()