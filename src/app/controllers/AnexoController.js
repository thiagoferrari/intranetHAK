import Anexo from '../models/Anexo';

class AnexoController {
	async store(req, res) {
		const { originalname: name, filename: path } = req.file;

		const anexo = await Anexo.create({
			name,
			path,
		});

		return res.json(anexo);
	}
}

export default new AnexoController(); 