import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema/schema';
import express from "express"
import mongoose from "mongoose"
import { apiConfig } from './config/api';
import path from 'path';
import cookieParser from "cookie-parser"
import { auth } from './middleware/auth.middleware';
import cors from "cors"

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
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req, res}) => ({req, res})
  });
  await mongoose.connect(apiConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true
  })

  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }))
  app.use(cookieParser())
  app.use(auth)
  server.applyMiddleware({ app, cors: false });
  
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

start().catch(e => console.log(e))