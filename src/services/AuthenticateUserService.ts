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
            process.env.SECRET_TOKEN,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        );

        return token;


    }
}

export { AutheticateUserService }