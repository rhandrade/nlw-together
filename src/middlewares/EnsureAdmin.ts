import { NextFunction, Request, Response } from 'express';
import { AppException } from '../exceptions/AppException';

export function ensureAdmin(request: Request, response: Response, next: NextFunction){

    const admin = false;

    if(admin){
        return next();
    }

    throw new AppException({ message: 'Unauthorized: You could not make this action', status: 401 });    

}