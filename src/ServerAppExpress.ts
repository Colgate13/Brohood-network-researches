import 'reflect-metadata';
import express from 'express';

import createConnection from './database'
import { router } from './routes';

createConnection();
const app = express();

//Metodos HTTP
/* GET -> Busca
   POST -> Salvar
    PUT -> Alterar
    DELETE -> Deletar
    PATCH -> Alteração espedifíca
*/
app.use(express.json());
app.use(router);


export default app;