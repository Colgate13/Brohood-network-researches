import 'reflect-metadata';
import express, { NextFunction, Request, Response  } from 'express';
import "express-async-errors";
import createConnection from './database'
import { router } from './routes';
import { AppError } from './errors/AppError';

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

/**
 * Middleware's
*/

function logRequests(request, response, next)
{

   const { method, url } = request;

   const logLabel = `[${method.toUpperCase()}] ${url}`;
   console.time(logLabel)//Console.time conta o tempo de um console.log para outro
    
   next();
    console.timeEnd(logLabel);

}


app.use(logRequests);

try {
    app.use(router);
} catch (error) {
    console.log("catch (error) ->> router !!!!!!!!!!!!!!!!!!!!! ");
    console.log(error);
}

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message
            });
        }
        return response.status(500).json({
            status: "Error",
            message: `Internal server error ${err.message}`, 
        });
    }
);


export default app;