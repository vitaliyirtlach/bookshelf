import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken"
import { jwt } from '../config/jwt';

export const auth = (req: any, res: Response, next: NextFunction) => {
    const accessToken: string = req.cookies["access-token"]
    if (!accessToken) return next()
    try {
        const data: any = verify(accessToken, jwt['access-token'])
        req.userId = data.id
    } catch(e) {}

    next()
}

