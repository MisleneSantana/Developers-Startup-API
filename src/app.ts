import 'express-async-errors';
import express, { Application } from 'express';
import handleError from './middlewares/handleErrors.middleware';
import { developersRoutes } from './routers/developers.routers';

const app: Application = express();
app.use(express.json());

app.use('/developers', developersRoutes);

app.use(handleError); //Deve ser o último dentro do app

export default app;
