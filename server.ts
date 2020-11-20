import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema/schema';
import express from "express"
import mongoose from "mongoose"
import { apiConfig } from './config/api';
import path from 'path';

const isDev = process.env.NODE_ENV === "development"
const app = express()
if (!isDev) {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const port = 4000
const start = async () => {
  await mongoose.connect(apiConfig.url, {
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