import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/surveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/usersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController{
    async execute(request: Request, response: Response){
        const{ email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await usersRepository.findOne({email}); // Verifica se o usuário existe

        if(!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exist !",
            });
        }

        const survey = await surveysRepository.findOne({id: survey_id});

        if(!survey){
            return response.status(400).json({
                error: "Survey does not exist !",
            });
        }

        //Salvar informações na tabela surveys_users

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });
        await surveysRepository.save(surveyUser);

        //Enviar email para o usuário

        await SendMailService.execute(email, survey.title, survey.description);

        return response.json(surveyUser);
    }
}

export { SendMailController }