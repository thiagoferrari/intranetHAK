import Empresa from "../models/Empresa";
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
      dsEmpresa: Yup.string().required()
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
}

export default new EmpresaController()