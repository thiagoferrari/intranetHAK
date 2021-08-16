import { Router } from 'express';
import UsuarioController from './app/controllers/UsuarioController';
import EntrarController from './app/controllers/EntrarController';
import EmpresaController from './app/controllers/EmpresaController';


const routes = new Router();

routes.post('/Usuario', UsuarioController.store)
routes.post('/Empresa', EmpresaController.store)
routes.post('/Entrar', EntrarController.store)

routes.put('/Usuario', UsuarioController.update)
routes.put('/Empresa', EmpresaController.update)


export default routes;