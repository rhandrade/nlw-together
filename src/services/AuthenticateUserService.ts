import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { AppException } from '../exceptions/AppException';
import { UserRepositories } from '../repositories/UsersRepositories'


interface IAuthenticateRequest{
    email: string;
    password: string
}

class AutheticateUserService{
    async execute({ email, password }: IAuthenticateRequest){

        const userRepositories = getCustomRepository(UserRepositories);

        const user = await userRepositories.findOne({ email });

        if(!user){
            throw new AppException({ message: 'Email or password incorrect' , status: 401 });
        }

        if(! await compare(password, user.password)){
            throw new AppException({ message: 'Email or password incorrect' , status: 401 });
        }

        const token = sign(
            {
                email: user.email, 
                name : user.name
            }, 
            '8b7dcc5f7f69fef0972bb6751a52d8aa',
            {
                subject: user.id,
                expiresIn: '1d'
            }
        );

        return token;


    }
}

export { AutheticateUserService }