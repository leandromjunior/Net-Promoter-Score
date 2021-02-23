import 'reflect-metadata';
import express, { request, response } from 'express';
import "./database";
import { router } from './routes';

const app = express();

app.use(express.json()); //Recebe dados com formato json, como a requisição do insomnia por exemplo
app.use(router);

app.listen(3333, () => console.log("Server is running")); //Criando servidor (porta 3333 esta livre)