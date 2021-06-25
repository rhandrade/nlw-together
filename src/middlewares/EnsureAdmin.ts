import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppException } from '../exceptions/AppException';
import { UserRepositories } from '../repositories/UsersRepositories';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction){

    const { user_id } = request;
    
    const usersRepositories = getCustomRepository(UserRepositories);

    const user = await usersRepositories.findOne(user_id);

    if(!user){
        throw new AppException({ message: 'Unauthorized: User not found.', status: 401 });    
    }

    if(user.admin){
        return next();
    }

    throw new AppException({ message: 'Unauthorized: You could not make this action', status: 401 });    

}