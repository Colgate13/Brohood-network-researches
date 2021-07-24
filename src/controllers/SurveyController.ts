import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { UsersRepository } from '../repositories/UsersRepository';


class SurveyController {

    async create(request: Request, response: Response)
    {
        const { title, description, propried  } = request.body;

        const surveysRepository = getCustomRepository(SurveyRepository);

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({id: propried});

        if(!user)
        {
            console.log(`> Try Registred Survey propried invalid propried=${propried} RETURN -> BLOCKED`);
            throw new AppError("error: User does not exist");
        }


        const survey = surveysRepository.create({
            title,
            description,
            propried,
        });

        await surveysRepository.save(survey);
        console.log(`> log-Survey: Survey saved in DB(Survey) Title: '${survey.title}' Description: '${survey.description}' with id: '${survey.id}''`);
        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response) {

        const surveysRepository = getCustomRepository(SurveyRepository);

        const all = await surveysRepository.find();

        return response.json(all);
    }
}
export default SurveyController;