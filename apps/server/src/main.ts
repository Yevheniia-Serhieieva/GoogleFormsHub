import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { readFileSync } from 'node:fs';
import { resolvers } from './resolvers';

const typeDefs = readFileSync(
  new URL('./schema/schema.graphql', import.meta.url),
  'utf-8',
);

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  maskedErrors: false,
  cors: {
    origin: 'http://localhost:5173', // or process.env.CLIENT_URL || 'http://localhost:5173'
  },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000/graphql');
});
