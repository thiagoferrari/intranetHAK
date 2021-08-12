import { Router } from 'express';
import AcessoController from './app/controllers/AcessoController';

const routes = new Router();

routes.post('/Acesso', AcessoController.store)

export default routes;