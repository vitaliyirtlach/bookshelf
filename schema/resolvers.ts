import {Book} from "../models/Book"
export const resolvers  = {
    Query: {
        listOfBooks: () => Book.find()
    },
    Mutation: {
       createBook: async (_: any, { name, plot, cover, author }: any) => {
            const book = new Book({ name, plot, cover, author })
            await book.save()
            return book
        }
    }
}