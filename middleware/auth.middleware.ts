import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken"
import { User } from "../models/User";
import { createTokens } from "../utils/createTokens";
import { jwt } from '../config/jwt';

export const auth = (req: any, res: any, next: NextFunction) => {
    const accessToken = req.cookies["access-token"]
    const refreshToken = req.cookies["refresh-token"]
    if (!refreshToken && !accessToken) return next()
    try {
        const data = verify(accessToken, jwt['access-token']) as any
        (req as any).userId = data.id
        return next()
    } catch(e) {}
    if (!refreshToken) return next()

    try {
        const data = verify(refreshToken, jwt["refresh-token"]) as any
        const user = User.findOne({_id: data.id})
        const tokens = createTokens(user)
        res.cookie("refresh-token", tokens.refresh, {expire: 60*60*24*7})
        res.cookie("access-token", tokens.access, {expire: 60*60})
        req.userId = data.id

        return next()
        
    } catch(e) {}
    next()
}