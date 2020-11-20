import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        hello: String!
    }
    type Book {
        id: ID!,
        name: String,
        plot: String,
        cover: String,
        author: String
    }
    type Mutation {
        createBook(name: String, plot: String!, cover: String, author: String): Book
    }
`