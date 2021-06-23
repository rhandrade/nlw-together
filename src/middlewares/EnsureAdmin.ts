import { NextFunction, Request, Response } from 'express';

export function ensureAdmin(request: Request, response: Response, next: NextFunction){

    const admin = true;

    if(admin){
        return next();
    }

    return response.status(401).json({
        success : false,
        error   : 'Unauthorized: You could not make this action'
    });


}