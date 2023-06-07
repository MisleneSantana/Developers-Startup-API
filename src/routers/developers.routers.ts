import { Router } from 'express';
import {
  createDeveloperController,
  createDeveloperInfosController,
  readDeveloperController,
} from '../controllers/developers.controllers';
import { verifyEmailExists } from '../middlewares/verifyEmailExists';

export const developersRoutes: Router = Router();

developersRoutes.post('', verifyEmailExists, createDeveloperController);
developersRoutes.get('/:id', readDeveloperController);
// developersRoutes.patch('/:id');
// developersRoutes.delete('/:id');

developersRoutes.post('/:id/infos', createDeveloperInfosController);
