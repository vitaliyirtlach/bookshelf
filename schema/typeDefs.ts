import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        me: User,
        getBooks(author: String, name: String): [Book],
        getBook(id: ID): Book,
        getUser(id: ID!): User
    }
    
    type Cover {
        data: [Int],
        contentType: String
    }
    type Book {
        id: ID!,
        name: String!,
        plot: String!,
        cover: Cover,
        author: ID!
    }
 
    type User {
        id: ID,
        username: String,
        email: String,
    }

    type Mutation {
        createBook(name: String!, plot: String!, cover: Upload!): Book,
        signup(username: String, password: String, email: String): Boolean,
        login(email: String, password: String): Boolean
    }
`