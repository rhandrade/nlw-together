import { getCustomRepository } from 'typeorm';
import { AppException } from '../exceptions/AppException';
import { UserRepositories } from '../repositories/UsersRepositories'

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService{

    async execute({ name, email, admin} : IUserRequest){

        const usersRepository = getCustomRepository(UserRepositories);

        if(!email){
            throw new AppException({ message: 'Email incorrect' });
        }

        const userAlreadyExists = await usersRepository.findOne({ email });

        if(userAlreadyExists){            
            throw new AppException({ message: 'User already exists' });
        }

        const user = usersRepository.create({
            name, email, admin
        });

        await usersRepository.save(user);

        return user;

    }

}

export { CreateUserService }