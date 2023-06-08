import { Router } from 'express';
import {
  createDeveloperController,
  createDeveloperInfosController,
  deleteDeveloperController,
  readDeveloperController,
  updateDeveloperController,
} from '../controllers/developers.controllers';
import { verifyEmailExistsMiddleware } from '../middlewares/verifyEmailExists.middlewares';
import { verifyDeveloperIdExistsMiddleware } from '../middlewares/verifyDeveloperIdExists.middlewares';
import { verifyPreferredOSMiddleware } from '../middlewares/verifyPreferredOS.middlewares';

export const developersRoutes: Router = Router();

developersRoutes.post('', verifyEmailExistsMiddleware, createDeveloperController);
developersRoutes.get('/:id', verifyDeveloperIdExistsMiddleware, readDeveloperController);
developersRoutes.patch(
  '/:id',
  verifyDeveloperIdExistsMiddleware,
  verifyEmailExistsMiddleware,
  updateDeveloperController
);
developersRoutes.delete('/:id', verifyDeveloperIdExistsMiddleware, deleteDeveloperController);

developersRoutes.post(
  '/:id/infos',
  verifyPreferredOSMiddleware,
  verifyDeveloperIdExistsMiddleware,
  createDeveloperInfosController
);
