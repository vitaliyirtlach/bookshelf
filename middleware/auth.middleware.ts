import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken"
import { User } from "../models/User";
import { createTokens } from "../utils/createTokens";
import { jwt } from '../config/jwt';

export const auth = (req: any, res: any, next: NextFunction) => {
    const accessToken = req.cookies["access-token"]
    const refreshToken = req.cookies["refresh-token"]

    if (!accessToken) return next()
    try {
        const data: any = verify(accessToken, jwt['access-token'])
        console.log(data.id)
        req.userId = data.id
    } catch(e) {}
    // }
    // if (!refreshToken) return next()
    // console.log("t")
    // try {
    //     const data = verify(refreshToken, jwt["refresh-token"]) as any
    //     const user = User.findOne({_id: data.id})
    //     const tokens = createTokens(user)
    //     res.cookie("refresh-token", tokens.refresh, {
    //         secure: process.env.NODE_ENV === "production",
    //         maxAge: 1000 * 60 * 60 * 24 * 14,
    //         httpOnly: true
    //     })
    //     res.cookie("access-token", tokens.access, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === "production",
    //         maxAge: 1000 * 60 * 60 * 24 * 7
    //     })
    //     req.userId = data.id

    //     return next()
        
    // } catch(e) {}
    next()
}