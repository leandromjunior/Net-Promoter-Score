import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/usersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController{
    
    async create(request: Request, response: Response){
        const{ name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });
        
        try{
            await schema.validate(request.body, { abortEarly: false});
        } catch (err){
            throw new AppError("Validation Failed!")
        }


        const usersRepository = getCustomRepository(UsersRepository);

        //mesma coisa que -> SELECT * FROM USERS WHERE EMAIL = "EMAIL" <- ou seja, verificar atraves do email se o usuario ja existe
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists){
            throw new AppError("This user already exists !");
        }

        const user = usersRepository.create({
            name,
            email
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UserController };
