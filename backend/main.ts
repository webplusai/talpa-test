import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import schema from './schema';

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});

app.use('*', cors());
app.use(compression());
server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });
});

const httpServer = createServer(app);
httpServer.listen({ port: 1337 }, (): void =>
  console.log(`\n🚀      GraphQL is now running on http://localhost:1337/graphql`),
);
