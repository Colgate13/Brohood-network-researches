import {  Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';
import { resolve } from 'path';



class SendMailController {
    async execute(request: Request, response: Response)
    {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({email});

        if(!user)
        {
            console.log(`> log-sendMail: ERROR send mail with email(${email}) does existe`);
            console.error(`> log-sendMail: ERROR send mail with email(${email}) does existe`);
            return response.status(400).json({
                error: "User does not exist",                
            });
        }

        const survey = await surveyRepository.findOne({id: survey_id})

             if(!survey)
        {
            console.log(`> log-sendMail: ERROR send mail with Survey(${survey_id}) does existe`);
            console.error(`> log-sendMail: ERROR send mail with Survey(${survey_id}) does existe`);
            return response.status(400).json({
                error: "Survey does not exist",                
            });
        }
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            survey_id: survey.id,
            link: process.env.URL_MAIL,
        }

        const surveyUserAlreadyExist = await surveysUsersRepository.findOne({
            where: [{user_id: user.id}, {value : null}],
            relations: ["user", "survey"],
        })

        if(surveyUserAlreadyExist)
        {
            console.log(`> log-sendMail: MailSend with ${surveyUserAlreadyExist}`)
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExist);
        }

        //Salvar infos na tabela
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id: survey.id,
        });
        await surveysUsersRepository.save(surveyUser);

        
        //Enviar email para user


        await SendMailService.execute(email, survey.title, variables, npsPath);
        
        
        console.log(`> log-sendMail: Created in DB(surveysUsers) surveyUserUser=${user.id} and  surveyUserSurvey=${survey_id}`)
        return response.json(surveyUser);
    }

}

export default SendMailController;