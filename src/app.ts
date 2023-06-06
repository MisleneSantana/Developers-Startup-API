import 'express-async-errors';
import express, { Application } from 'express';
import handleError from './middlewares/handleErrors.middleware';

const app: Application = express();
app.use(express.json());

app.use('/'); //Arquivo de rotas

app.use(handleError); //Deve ser o último dentro do app

export default app;
