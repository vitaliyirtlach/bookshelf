import { Book } from "../models/Book"
import { User } from  "../models/User"
import { compare, hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import { jwt } from "../config/jwt"

export const resolvers  = {
    Query: {
        me: (_: any, __: any, { req }: any) => {
            if (!req.userId) return null
            return User.findOne({_id: req.userId})
        },
        listOfBooks: async (parent: any, args: any, ctx: any) => {
            const books = await Book.find()
            return books.reverse()
        } 
        
    },
    Mutation: {
        createBook: async (_: any, { name, plot, cover, author }: any) => {
            const book = new Book({ name, plot, cover, author })
            await book.save()
            return book
        },
        signup: async (_: any, { username, email, password }: any) => {
            const hashedPassword = await hash(password, 10)
            const candidates = [await User.findOne({ username }), await User.findOne({ email })]
            if (!candidates.length) return null
            const user = new User({
                username,
                email,
                password: hashedPassword
            }).save()
            return user
        },
        login: async(_: any, {email, password}: any, { res }: any) => {

            const user: any = await User.findOne({ email })
            if (!user) return null
            const valid = await compare(password, user.password)
            if (!valid) return null
            const tokens = {
                access: sign({ id: user.id }, jwt.secret, {
                    expiresIn: "14 days"
                }),
                refresh: sign({ id: user.id }, jwt.secret, {
                    expiresIn: "14 days"
                })
            }
            
            res.cookie("refresh-token", tokens.refresh, {expire: 60*60*24*7})
            res.cookie("access-token", tokens.refresh, {expire: 60*60})

            return user
        }
    }
}