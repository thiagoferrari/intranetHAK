import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import AnexoController from './app/controllers/AnexoController';
import LoginController from './app/controllers/LoginController';
import EntrarController from './app/controllers/EntrarController';
import EmpresaController from './app/controllers/EmpresaController';
import SetorController from './app/controllers/SetorController';
import ColaboradorController from './app/controllers/ColaboradorController';
import RamalController from './app/controllers/RamalController';
import ComunicadoController from './app/controllers/ComunicadoController';
import SugestaoController from './app/controllers/SugestaoController';
import PoliticaController from './app/controllers/PoliticaController';
import PabxController from './app/controllers/PabxController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/Anexo', upload.single('anexo'), AnexoController.store);

routes.post('/Entrar', EntrarController.login)

// create
routes.post('/Login', LoginController.store)
routes.post('/Empresa', EmpresaController.store)
routes.post('/Setor', SetorController.store)
routes.post('/Colaborador', ColaboradorController.store)
routes.post('/Ramal', RamalController.store)
routes.post('/Comunicado', ComunicadoController.store)
routes.post('/Sugestao', SugestaoController.store)
routes.post('/Politica', PoliticaController.store)
routes.post('/Pabx', PabxController.store)



// read
routes.get('/Login', LoginController.index)
routes.get('/Login/:id', LoginController.show)

routes.get('/Empresa', EmpresaController.index)
routes.get('/Empresa/:id', EmpresaController.show)

routes.get('/Setor', SetorController.index)
routes.get('/Setor/:id', SetorController.show)

routes.get('/Colaborador', ColaboradorController.index)
routes.get('/Colaborador/:id', ColaboradorController.show)

routes.get('/Ramal', RamalController.index)
routes.get('/Ramal/:id', RamalController.show)

routes.get('/Comunicado', ComunicadoController.index)
routes.get('/Comunicado/:id', ComunicadoController.show)

routes.get('/Sugestao', SugestaoController.index)
routes.get('/Sugestao/:id', SugestaoController.show)

routes.get('/Politica', PoliticaController.index)
routes.get('/Politica/:id', PoliticaController.show)

routes.get('/Pabx', PabxController.index)
routes.get('/Pabx/:id', PabxController.show)



// update
routes.put('/Login', LoginController.update)
routes.put('/Empresa', EmpresaController.update)
routes.put('/Setor', SetorController.update)
routes.put('/Colaborador', ColaboradorController.update)
routes.put('/Ramal', RamalController.update)
routes.put('/Comunicado', ComunicadoController.update)
routes.put('/Sugestao', SugestaoController.update)
routes.put('/Politica', PoliticaController.update)
routes.put('/Pabx', PabxController.update)



// delete
routes.delete('/Login/:id', LoginController.delete)
routes.delete('/Empresa/:id', EmpresaController.delete)
routes.delete('/Setor/:id', SetorController.delete)
routes.delete('/Colaborador/:id', ColaboradorController.delete)
routes.delete('/Ramal/:id', RamalController.delete)
routes.delete('/Comunicado/:id', ComunicadoController.delete)
routes.delete('/Sugestao/:id', SugestaoController.delete)
routes.delete('/Politica/:id', PoliticaController.delete)
routes.delete('/Pabx/:id', PabxController.delete)


export default routes;