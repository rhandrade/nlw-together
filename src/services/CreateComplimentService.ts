import { response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppException } from '../exceptions/AppException';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories'
import { UserRepositories } from '../repositories/UsersRepositories';

interface IComplimentRequest{
    tag_id: string;
    user_sender_id: string;
    user_receiver_id: string;
    message: string;
}

class CreateComplimentService{
    async execute({ tag_id, user_sender_id, user_receiver_id, message } : IComplimentRequest){

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        
        if(user_sender_id == user_receiver_id){
            throw new AppException({ message: 'User receiver can not be the same as sender.' });
        }        
        
        const usersRepositories  = getCustomRepository(UserRepositories);
        const userReceiverExists = await usersRepositories.findOne(user_receiver_id);

        if(!userReceiverExists){
            throw new AppException({ message: 'User receiver does not exists.' });
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender_id,
            user_receiver_id,
            message
        })

        await complimentsRepositories.save(compliment);

        return compliment;

    }
}

export { CreateComplimentService }