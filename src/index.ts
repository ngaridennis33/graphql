import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './typedefs' 
import { resolvers } from './resolvers'

;import { makeExecutableSchema } from 'graphql-tools';
(async () => {
  // Create executable schema without authentication middleware if you're not using it
  const schema = makeExecutableSchema({
    typeDefs: typeDefs, 
    resolvers,
  })

  // Create Apollo Server instance with the schema
  const server = new ApolloServer({
    schema: schema,
    includeStacktraceInErrorResponses: false,  // Hide stacktrace in production
    introspection: true,  // Allow introspection of the schema for tools like GraphQL Playground
    logger: console,      // Set up logging to console
  })

  // Start the Apollo server on the specified port
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT ? parseInt(process.env.PORT) : 4545 },
    context: async ({ req, res }) => {
      return { req, res }  // Pass request and response objects for context if needed
    },
  })

  // Log the URL for the GraphQL API
  console.log(`
      🚀  Server is running at ${url}
      📭  Send GraphQL queries to this endpoint
    `)
})()
