import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        me: User!,
        listOfBooks: [Book!] 
    }
    
    type Book {
        id: ID!,
        name: String,
        plot: String,
        cover: String,
        author: String
    }

    type User {
        id: ID!,
        username: String,
        email: String,
        cover: String,
        books: [Book!]
    }

    type Mutation {
        createBook(name: String, plot: String, cover: String, author: String): Book,
        signup(username: String, password: String, email: String): User!,
        login(email: String, password: String): User!
    }
`