import {  Request, Response } from 'express';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import Survey from '../models/Survey';
import EstaticsCalculateService from '../services/EstaticsCalculateService';
/**
 * 
 * 1 2 3 4 5 6 7 8 9 10
 * Detratores => 8 - 6
 * Passivos => 7 - 8
 * Promotores => 9 - 10
 * 
 * (Numeros de promotores - numeros de detratores) / (numero de respondentes) x 100
 */


class NpsController {
    async execute(request: Request, response: Response)
    {
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        })

        const detractor = surveyUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const promoters = surveyUsers.filter(
            survey => survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveyUsers.filter(
            survey => survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveyUsers.length;

        const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(4));

        //--------------------END NPS, start statics aplicad
        //n: number, hated: number, disliked: number, indifferent: number, like: number, love: number 
        const hated = surveyUsers.filter(
          (survey) => survey.value >= 1 && survey.value <= 2

         ).length;

        const disliked = surveyUsers.filter(
        (survey) => survey.value >= 3 && survey.value <= 4

        ).length;

        const indifferent = surveyUsers.filter(
        (survey) => survey.value >= 5 && survey.value <= 6

        ).length;

        const like = surveyUsers.filter(
        (survey) => survey.value >= 7 && survey.value <= 8

        ).length;

        const love = surveyUsers.filter(
        (survey) => survey.value >= 9 && survey.value <= 10

        ).length;

         console.log("hated: " + hated)
         console.log("disliked: " + disliked)
         console.log("indifferent: " + indifferent)
         console.log("like: " + like)
         console.log("love: " + love)


        const returnEstatics =  await EstaticsCalculateService.execute(hated, disliked, indifferent, like, love);

         

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate,

            hated,
            disliked,
            indifferent,
            like,
            love,
            returnEstatics,
        });
    }
}

export { NpsController }