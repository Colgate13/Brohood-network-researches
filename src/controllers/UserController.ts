import { Request, Response } from  'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    async create(request: Request, response: Response)
    {
        const { name, email } = request.body;

        const usersRepository = getRepository(User);

        const userAlredyExists = await usersRepository.findOne({
            name
        });
        const emailAlredyExists = await usersRepository.findOne({
            email
        });

        
        
        if(emailAlredyExists) {
            console.log(`> log-Registred_User: Try Registred another user with email: '${request.body.email}' -> BLOCKED`);
            return response.status(400).json({
                error: "Email already used!",
            });
        }

        if(userAlredyExists) {
            console.log(`> log-Registred_User: Try Registred another user with name: '${request.body.name}' -> BLOCKED`);
            return response.status(400).json({
                error: "Name already used!",
            });
        }

        const user = usersRepository.create({
            name, email
        })

        await usersRepository.save(user);

        console.log(`> log-Registred_User: '${user.name}' Email: '${user.email}' Registred in DB(users) with id: '${user.id}'`);
        return response.json(user);

    }   
}

export { UserController };