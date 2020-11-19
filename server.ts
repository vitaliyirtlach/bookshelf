import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema/schema';
import express from "express"
import { webpack } from 'webpack';
import config from './webpack.config';
import WebpackDevMiddleware from 'webpack-dev-middleware';

const app = express()
const compiler = webpack(config)
if (process.env.NODE_ENV === "production") {
    app.use(WebpackDevMiddleware(compiler))
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

