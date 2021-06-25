import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppException } from '../exceptions/AppException';

interface IPayLoad{
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    const authToken = request.headers.authorization;

    if(!authToken){
        throw new AppException({ message: 'Unauthorized. Please provide access token.', status: 401 });
    }    

    const [, token] = authToken.split(' ');
   
    try {

        const { sub } = verify(token, process.env.SECRET_TOKEN) as IPayLoad;
        request.user_id = sub;        

        return next();
        
    } catch (error) {
        throw new AppException({ message: 'Unauthorized. Please provide access token.', status: 401 });        
    }    

}