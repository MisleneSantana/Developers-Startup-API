import { Router } from 'express';
import {
  createProjectController,
  readProjectController,
  updateProjectController,
} from '../controllers/projects.controllers';
import { verifyIdExistsInBodyExistsMiddleware } from '../middlewares/verifyIdExistsInBodyExists.middlewares';
import { verifyProjectIdExistsMiddleware } from '../middlewares/verifyProjectIdExists.middlewares';

export const projectsRoutes: Router = Router();

projectsRoutes.post('', verifyIdExistsInBodyExistsMiddleware, createProjectController);
projectsRoutes.get('/:id', verifyProjectIdExistsMiddleware, readProjectController);
projectsRoutes.patch(
  '/:id',
  verifyProjectIdExistsMiddleware,
  verifyIdExistsInBodyExistsMiddleware,
  updateProjectController
);
