import { gql } from "apollo-server-express"

const typeDefs = gql`
    type Query {
        hello: String!
    }
`
const resolvers  = {
    Query: {
        hello: () => "Hello"
    }
}
export {typeDefs, resolvers}