import { Router } from 'express';
import UsuarioController from './app/controllers/UsuarioController';
import EntrarController from './app/controllers/EntrarController';
import EmpresaController from './app/controllers/EmpresaController';
import SetorController from './app/controllers/SetorController';
import ColaboradorController from './app/controllers/ColaboradorController';
import RamalController from './app/controllers/RamalController';

const routes = new Router();

routes.post('/Usuario', UsuarioController.store)
routes.post('/Empresa', EmpresaController.store)
routes.post('/Entrar', EntrarController.store)
routes.post('/Setor', SetorController.store)
routes.post('/Colaborador', ColaboradorController.store)
routes.post('/Ramal', RamalController.store)


routes.put('/Usuario', UsuarioController.update)
routes.put('/Empresa', EmpresaController.update)
routes.put('/Setor', SetorController.update)
routes.put('/Colaborador', ColaboradorController.update)
routes.put('/Ramal', RamalController.update)



export default routes;