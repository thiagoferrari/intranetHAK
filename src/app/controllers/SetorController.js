import Setor from "../models/Setor";
import * as Yup from 'yup'

class SetorController {
  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      dsSetor: Yup.string().required(),
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
      dsSetor: Yup.string().required()
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
}

export default new SetorController()