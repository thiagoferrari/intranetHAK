import { Router } from 'express';
import UsuarioController from './app/controllers/UsuarioController';
import EntrarController from './app/controllers/EntrarController';


const routes = new Router();

routes.post('/Usuario', UsuarioController.store)
routes.post('/Entrar', EntrarController.store)

routes.put('/Usuario', UsuarioController.update);


export default routes;