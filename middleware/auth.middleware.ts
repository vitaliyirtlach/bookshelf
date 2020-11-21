import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { jwt } from '../config/jwt';

export const auth = (req: any, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies["access-token"]
        console.log(accessToken)
        const data = verify(accessToken, jwt.secret) as any
        (req as any).userId = data.id
        next()
    } catch(e) {
        console.log(e)
    }
    
}