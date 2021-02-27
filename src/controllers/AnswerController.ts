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

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(id)
        });

        if(!surveyUser)
        {
            throw new AppError("error: Survey does not exists!");
        }
        
        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);
        console.log(surveyUser)
        return response.json(surveyUser);
    }
}

export default  AnswerController;