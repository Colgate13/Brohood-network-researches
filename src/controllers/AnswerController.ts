import {  Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import SurveyUser from '../models/SurveyUser';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';


// http://localhost:3333/answers/10?id=ff8c1d95-31e2-4bf1-8a10-e3063e4da0eb
/*
 Routes Params -> Parametros que compôe a rota. Ex: /10
 routes.get("/answers/:value/")
 
 
 Query Params -> Busca, Paginação, não obrigatorio. Ex ?id
 Chave=valor
 */
class AnswerController {
    async execute(request: Request, response: Response ){
        const { value } = request.params;
        const { id } = request.query;
        const { email } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user_id = await surveysUsersRepository.findOne({user_id: String(email)});


        if(!user_id)
        {
            throw new AppError(`error: Survey does not exists! ${String(email)}`);
        }
        
        user_id.value = Number(value);
  
        console.log(`> Id=${id}`)
        console.log(`> value=${value}`)

        await surveysUsersRepository.save(user_id);
        console.log(user_id)
        return response.json(user_id);
    }
}

export default  AnswerController;