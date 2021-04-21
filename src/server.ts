import { buildSchema } from 'graphql';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { flaschenpost, getMiddleware } from 'flaschenpost';

const logger = flaschenpost.getLogger();

// --------------
// Express config
// --------------
const app = express();
const port = '8000';

// Add Express middleware
app.use(getMiddleware({ logOn: 'request' }));

app.get('/', (request, response): any => {
  response.send('Express + TypeScript Server');
});

// --------------
// GraphQL config
// --------------

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello (): string {
    return 'Hello world!';
  }
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

// Start server
app.listen(port, (): void => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
  logger.info(`⚡️[server]: GraphQL endpoint is running at http://localhost:${port}/graphql`);
});
