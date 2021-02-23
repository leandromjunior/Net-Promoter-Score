import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from "../models/User";
class UserController{
    
    async create(request: Request, response: Response){
        const{ name, email } = request.body;

        const usersRepository = getRepository(User);

        //mesma coisa que -> SELECT * FROM USERS WHERE EMAIL = "EMAIL" <- ou seja, verificar atraves do email se o usuario ja existe
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists){
            return response.status(400).json({
                error: "This user already exists !",
            });
        }

        const user = usersRepository.create({
            name,
            email
        });

        await usersRepository.save(user);

        return response.json(user);
    }
}

export{ UserController }