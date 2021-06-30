import {Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';

export function validateRequestSchema(req: Request, res:Response, next:NextFunction) {
    const result = validationResult(req);
    var mensajes = [];
    console.log(result);

    if(!result.isEmpty()){
        for (let i=0;i<result.array().length;i++) {
            mensajes.push(result.array()[i].param + ": " + result.array()[i].msg);            
        }	
        return res.status(500).json({  message:mensajes }); 	
    }       
    next();
}