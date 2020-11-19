import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema/schema';
import express from "express"
import mongoose from "mongoose"

const app = express()
const port = 4000
const start = async () => {
  await mongoose.connect("", {
    useNewUrlParser: true
  })
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  server.applyMiddleware({ app });
  
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

start()