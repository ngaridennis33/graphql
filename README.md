# GRAPHQL API WITH PRISMA

## Project Structure 

graphql-express-prisma
│
├── prisma
│   ├── migrations
│   └── schema.prisma
├── src
│   │ 
│   ├── generated
│   │    └── grapgql.ts
│   │   
│   ├── resolvers
│   │   ├── user.ts
│   │   ├── post.ts 
│   │   ├── post.ts 
│   │   └── index.ts
│   │
│   ├── middlewares 
│   │       └── index.ts
│   ├── typedefs.ts      
│   │ 
│   │ 
│   ├── utils
│   │    └── index.ts
│   │   
│   └── index.ts
│ 
├── .env
├── db.ts
├── codegen.ts
├── graphql.schema.json
├── nixpacks.toml
├── package.json
└── tsconfig.json

## Dependancies

- The key dependacies include:
* Prisma: ORM for database management.
* GraphQL: API specification for querying and manipulating data.
* Apollo Server: A GraphQL server for handling queries and mutations.
* TypeScript: JavaScript superset with static typing.
* GraphQL Codegen: Code generation tools for GraphQL schema and resolvers.

# 1. Configure Prisma with PostgreSQL
- Initialize Prisma. 
```bash
npx prisma init
```

# 2. Define the prisma models
The User model has fields like email, name, and posts, which define the properties of a user. 
The Post model has a relationship with the User model via authorId and author.

# 3. Migrate the Database
To create the tables in the PostgreSQL database based on these models, run:
```bash
npx prisma migrate dev --name init
```

# 4. Set Up Apollo Server
Apollo Server will handle our GraphQL queries and mutations. Its configured in the src/index.ts file.

# Explanation:
* ApolloServer: The Apollo server instance is created, which will handle GraphQL queries and mutations.
* typeDefs: The GraphQL schema definitions that define the types of data and operations (queries and mutations).
* resolvers: Functions that map queries and mutations to actual logic, like fetching data from the database.

# 5. GraphQL Schema (typedefs.ts)
In typedefs.ts, we define the GraphQL schema using the gql tagged template literal from graphql-tag.

* Explanation:
- User: Defines a User type with fields like id, email, and posts.
- Post: Defines a Post type with fields such as title, content, and author.
- Query: Defines GraphQL queries for fetching users and posts.
- Mutation: Defines GraphQL mutations for creating users and posts.

# 6. Resolvers (resolvers.ts)
Resolvers contain the logic for handling GraphQL queries and mutations.
* Explanation:
- Query Resolvers: These functions handle fetching data from the database. For example, users fetches all users and user fetches a single user by ID.
- Mutation Resolvers: These functions handle writing data to the database. For instance, createUser creates a new user and createPost creates a new post.
- Nested Resolvers: For relationships, such as a User's posts or a Post's author, we define resolver functions inside the User and Post resolvers to handle these nested queries.

# 6. GraphQL Code Generation
To automatically generate TypeScript types for GraphQL queries, mutations, and resolvers, we use GraphQL Codegen.

Configure Codegen (codegen.ts)
Create the codegen.ts file:
# Explanation:
* schema: Points to the GraphQL schema (typedefs.ts).
* documents: Looks for .ts files that contain gql tagged queries or mutations.
* generates: Specifies the output file (graphql.ts) and the plugins to generate TypeScript types for queries and resolvers.
* pluckConfig: Configures graphql-tag-pluck to extract gql tagged templates from TypeScript files.
### Run Codegen
Run the code generation:
```bash
npm run codegen
```
# 7. Running the Server
Now that everything is set up, you can start the server in development mode:
```bash
npm run dev
```

## Other files
* codegen.ts: This file is the configuration for GraphQL Codegen, telling it how to generate TypeScript types, resolver types, and introspection schema files based on your GraphQL schema.

* graphql.ts (in src/generated/): This file contains auto-generated TypeScript types for your GraphQL operations, providing type safety and autocompletion for your GraphQL queries, mutations, and resolvers.

* utils folder: A folder to store reusable utility functions for common operations throughout your application, such as authentication helpers, data transformations, and error handling.

* db.ts: A file where you initialize and configure the Prisma client to interact with your PostgreSQL database. It centralizes your database access logic and helps ensure consistency across your project.
