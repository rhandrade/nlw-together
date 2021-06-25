import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { AppException } from '../exceptions/AppException';
import { UserRepositories } from '../repositories/UsersRepositories';

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService{
    async execute({ name, email, admin = false, password} : IUserRequest){

        const usersRepository = getCustomRepository(UserRepositories);

        if(!email){
            throw new AppException({ message: 'Email incorrect' });
        }

        const userAlreadyExists = await usersRepository.findOne({ email });

        if(userAlreadyExists){            
            throw new AppException({ message: 'User already exists' });
        }

        const passwordHash = await hash(password, process.env.PASSWORD_SALT);

        const user = usersRepository.create({
            name, 
            email, 
            admin, 
            password: passwordHash
        });

        await usersRepository.save(user);

        return user;

    }
}

export { CreateUserService }