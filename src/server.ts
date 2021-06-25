import 'reflect-metadata';
import 'express-async-errors';

import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';

import { router } from './routes';
import { AppException } from './exceptions/AppException';

import './database';



dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

app.use((error: any, request: Request, response: Response, next: NextFunction) => {

    /* Process main application errors */    
    if(error instanceof AppException){
        return response.status(error.status).json({
            success : false,
            error   : error.message
        });
    }

    /* Process other thrown errors*/
    if(error instanceof Error){
        return response.status(400).json({
            success : false,
            error   : error.message
        });
    }

    /* Otherwise return a 500 status code */
    return response.status(500).json({
        success : false,
        error   : 'Internal server error'
    });

})

app.listen(3000, () => console.log('Server is running nlw valoriza'));