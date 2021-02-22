import express, { request, response } from 'express';

const app = express();

//Metodos HTTP
/* GET -> Busca
   POST -> Salvar
    PUT -> Alterar
    DELETE -> Deletar
    PATCH -> Alteração espedifíca
*/

app.get("/", (request, response) => {
    return response.json({ message: "Hellow World!"});
});


app.post("/", (request, response) =>{
    return response.json({ message: "Dados Salvos!" });
});

app.listen(3333, () => console.log("> Server is running!"));
