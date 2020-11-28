import { Book } from "../models/Book"
import { User } from  "../models/User"
import { compare, hash } from "bcrypt"
import { createTokens } from "../utils/createTokens"
import { createWriteStream, readFileSync } from "fs"
import { join } from "path"

export const resolvers  = {
    Query: {
        me: (_: any, __: any, { req }: any) => {
            if (!req.userId) return null
            return User.findOne({_id: req.userId})
        },
        getBooks: async (_: any, { author, name }: any) => {
            if (author && name) return (await Book.find({ author, name })).reverse()
            else if (author) return (await Book.find({ author })).reverse()
            else if (name) return (await Book.find({ name })).reverse()
            return (await Book.find()).reverse()
        },
        getBook: async (_: any, { id }: any) => {
            return await Book.findById(id)
        },
        getUser: async(_:any, { id }: any) => {
            return await User.findById(id)
        }
    },
    Mutation: {
        createBook: async (_: any, { name, plot, cover }: any, { req }: any) => {
            const { createReadStream, filename, mimetype } = await cover
            console.log(await cover)
            await new Promise((res, rej) => { 
                createReadStream()
                .pipe(createWriteStream(join(__dirname, "../uploads", filename)))
                .on("close", res)
            })

            const data = readFileSync(join(__dirname, "../uploads", filename))
            const book = new Book({ 
                name, 
                plot, 
                cover: {
                    data, 
                    contentType: mimetype
                }, 
                author: req.userId 
            }).save()
            return book 
        },
        signup: async (_: any, { username, email, password }: any, { res }: any) => {
            const hashedPassword = await hash(password, 10)
            const candidates = [await User.findOne({ username }), await User.findOne({ email })]
            if (!candidates.length) throw new Error("This username or email was registered previous!")
            const user = new User({ username, email, password: hashedPassword }).save()
            return true
        },
        login: async(_: any, {email, password}: any, { res }: any) => {
            const user: any = await User.findOne({ email })
            if (!user) throw new Error("Invalid password or email address")
            const valid = await compare(password, user.password)
            if (!valid) throw new Error("Invalid password or email address")
            const tokens = createTokens(user)
            res.cookie("access-token", tokens.access, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: true
            })
            return true
        }
    }
}