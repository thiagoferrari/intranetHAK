import { Router } from 'express';
import LoginController from './app/controllers/LoginController';
import EntrarController from './app/controllers/EntrarController';
import EmpresaController from './app/controllers/EmpresaController';
import SetorController from './app/controllers/SetorController';
import ColaboradorController from './app/controllers/ColaboradorController';
import RamalController from './app/controllers/RamalController';

const routes = new Router();

routes.post('/Entrar', EntrarController.login)

// create
routes.post('/Login', LoginController.store)
routes.post('/Empresa', EmpresaController.store)
routes.post('/Setor', SetorController.store)
routes.post('/Colaborador', ColaboradorController.store)
routes.post('/Ramal', RamalController.store)



// read
routes.get('/Logins', LoginController.index)
routes.get('/Login/:id', LoginController.show)

routes.get('/Empresas', EmpresaController.index)
routes.get('/Empresa/:id', EmpresaController.show)

routes.get('/Setores', SetorController.index)
routes.get('/Setor/:id', SetorController.show)

routes.get('/Colaboradores', ColaboradorController.index)
routes.get('/Colaborador/:id', ColaboradorController.show)

routes.get('/Ramais', RamalController.index)
routes.get('/Ramal/:id', RamalController.show)



// update
routes.put('/Login', LoginController.update)
routes.put('/Empresa', EmpresaController.update)
routes.put('/Setor', SetorController.update)
routes.put('/Colaborador', ColaboradorController.update)
routes.put('/Ramal', RamalController.update)



// delete
routes.delete('/Login/:id', LoginController.delete)
routes.delete('/Empresa/:id', EmpresaController.delete)
routes.delete('/Setor/:id', SetorController.delete)
routes.delete('/Colaborador/:id', ColaboradorController.delete)
routes.delete('/Ramal/:id', RamalController.delete)


export default routes;