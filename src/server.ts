import 'reflect-metadata';
import express from 'express';

import './database'
import { router } from './routes';

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

app.listen(3333, () => console.log("> Server is running!"));
