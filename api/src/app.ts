import express from 'express';
import 'reflect-metadata';
import createConnection from "./database";
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json()); //Recebe dados com formato json, como a requisição do insomnia por exemplo
app.use(router);

export { app };
