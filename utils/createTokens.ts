import { sign } from "jsonwebtoken"
import { jwt } from "../config/jwt"

export const createTokens = (user: any) => {
    const tokens = {
        access: sign({ id: user.id }, jwt["access-token"], {
            expiresIn: "7 days"
        }),
        refresh: sign({ id: user.id }, jwt["refresh-token"], {
            expiresIn: "14 days"
        })
    }
    return tokens
}