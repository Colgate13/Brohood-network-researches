import e, {  Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';
import { resolve } from 'path';
import { AppError } from '../errors/AppError';



class SendMailController {
    async execute(request: Request, response: Response)
    {
        const { email, survey_id } = request.body;

        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const survey = await surveyRepository.findOne({id: survey_id})

        if(!survey)
        {
            console.log(`> log-sendMail: ERROR send mail with Survey(${survey_id}) does existe`);
            console.error(`> log-sendMail: ERROR send mail with Survey(${survey_id}) does existe`);
            throw new AppError("error: Survey does not exist");                           
        }
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
                
                const variables = {
                    name: email,
                    title: survey.title,
                    description: survey.description,
                    link: process.env.URL_MAIL,
                    id: "",
                }
    
            
            //Salvar infos na tabela
            
            const surveyUser = surveysUsersRepository.create({
                user_id: email,
                survey_id: survey.id,
            });
            await surveysUsersRepository.save(surveyUser);
            variables.id = survey_id;
        
        //Enviar email para user


        await SendMailService.execute(email, survey.title, variables, npsPath);
        
        
        console.log(`> log-sendMail: Created in DB(surveysUsers) surveyUserUser=${email} and  surveyUserSurvey=${survey_id}`)
        return response.json(surveyUser);
    }

}

export default SendMailController;