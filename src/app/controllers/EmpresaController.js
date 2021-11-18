import Empresa from "../models/Empresa";
import logDelete from "../models/logDelete"
import * as Yup from 'yup'

class EmpresaController {
  async store(req, res) {

    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      nmFantasia: Yup.string().required(),
      dsRazaoSocial: Yup.string().required(),
      cdCNPJ: Yup.string().required(),
      cdCEP: Yup.string().required(),
      dsEndereco: Yup.string().required(),
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

    const schema = Yup.object().shape({
      stAtivo: Yup.boolean().required(),
      nmFantasia: Yup.string().required(),
      dsRazaoSocial: Yup.string().required(),
      cdCNPJ: Yup.string().required(),
      cdCEP: Yup.string().required(),
      dsEndereco: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { id } = req.body;

    const dadosDB = await Empresa.findByPk(id);

    await dadosDB.update(req.body)

    return res.json(req.body)
  }



  async index(req, res) {
    const verEmpresas = await Empresa.findAll({
      attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
      order: ['nmFantasia']
    })

    return res.json(verEmpresas)
  }



  async show(req, res) {
    const { id } = req.params

    const verEmpresa = await Empresa.findOne({
      where: { id },
      attributes: { include: [], exclude: ['createdAt', 'updatedAt'] },
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