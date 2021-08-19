import Colaborador from "../models/Colaborador";
import * as Yup from 'yup'

class ColaboradorController {
  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      dsColaborador: Yup.string().required(),
      stAtivo: Yup.string().required(),
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    console.log('req.body :>> ', req.body);

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
}

export default new ColaboradorController()