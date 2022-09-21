import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import multer from 'multer';
import uploadConfig from './config/uploadConfig';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TarefaController from './app/controllers/TarefaController';
import TarefaControllerDbDireto from './app/controllers/TarefaControllerDbDireto';

//const express = require('express');

const upload = multer(uploadConfig);

const routes = new Router();

routes.use('/upload', upload.single('foto'), TarefaController.upload);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Todas rotas abaixo desse middleware precisa estar autenticado
routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/users/:id_usuario', UserController.index);

routes.post('/tarefa', TarefaController.store);
routes.post('/tarefas', TarefaController.storeArray);
routes.get('/tarefa', TarefaController.index);
routes.get('/tarefaPaginacao', TarefaController.indexPaginacao);
routes.put('/tarefa/:id_tarefa', TarefaController.update);
routes.delete('/tarefa/:id_tarefa', TarefaController.delete);
routes.post('/upload', TarefaController.upload);

// EXEMPLOS COM SQL SIRETOS
routes.get('/tarefa/direto', TarefaControllerDbDireto.sqlDireto);
routes.post('/tarefa/direto', TarefaControllerDbDireto.sqlDiretoUpdate);

export default routes;
