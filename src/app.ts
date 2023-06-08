import 'express-async-errors';
import express, { Application } from 'express';
import { handleErrorMiddleware } from './middlewares/handleErrors.middlewares';
import { developersRoutes } from './routers/developers.routers';
import { projectsRoutes } from './routers/projects.routers';

const app: Application = express();
app.use(express.json());

app.use('/developers', developersRoutes);
app.use('/projects', projectsRoutes);

app.use(handleErrorMiddleware);

export default app;
