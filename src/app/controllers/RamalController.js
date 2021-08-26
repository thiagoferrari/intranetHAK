import Ramal from "../models/Ramal";
import Setor from "../models/Setor";
import * as Yup from 'yup'

class RamalController {
  async store(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      nrRamal: Yup.string().required(),
      stWhatsapp: Yup.string().required(),
      idSetor: Yup.number().required(),
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    /* select no DB procurando se já existe o ramal cadastrado */

    /* const ramalExistente = await Setor.findAll({
      where: { idSetor: req.body.nrRamal },
      order: ['id'],
      attributes: ['id', 'dsSetor'],
      include: [
        {
          model: Ramal,
          as: 'Setor'
        }
      ]
    }) */

    /* const ramalExistente = await Ramal.findAll({
      where: { nrRamal: req.body.nrRamal },
      order: ['id'],
      attributes: ['id', 'nrRamal', 'idSetor'],
      include: [
        {
          model: Setor,
          as: 'fkSetor'
        }
      ]
    }) */

    //console.log('ramalExistente :>> ', ramalExistente);

    await Ramal.create(req.body)

    /* retornando o que foi inserido */
    return res.json(req.body)
  }


  async update(req, res) {

    /* criando schema para Yup */
    const schema = Yup.object().shape({
      dsRamal: Yup.string().required()
    })

    /* comparando schema com req.body */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Inseridos de maneira incorreta' })
    }

    const { id, dsRamal } = req.body

    const dadosDB = await Ramal.findByPk(id)

    await dadosDB.update(req.body)

    return res.json({ dsRamalNovo: dsRamal })
  }
}

export default new RamalController()