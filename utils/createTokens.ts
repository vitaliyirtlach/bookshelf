import { sign } from "jsonwebtoken"
import { jwt } from "../config/jwt"

export const createTokens = (user: any) => {
    const tokens = {
        access: sign({ id: user.id }, jwt["access-token"], {
            expiresIn: "7 days"
        }),
    }
    return tokens
}