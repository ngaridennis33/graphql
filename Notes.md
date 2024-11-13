# GRAPHQL - API
## Introduction
- GraphQL is a query language for APIs, developed by Facebook, that enables clients to request only the data they need. Unlike REST, which has multiple endpoints for different resources, GraphQL typically has one endpoint, and clients can specify exactly which data they want, reducing over-fetching or under-fetching of data.
* Example: 
```js
query {
  user(id: 1) {
    name
    email
  }
}
```
This query asks for a user with the specified id and retrieves only the name and email fields.

## Benefits of Using GraphQL
* Efficient Data Fetching: Fetch exactly what you need in one request.
* Single Endpoint: Use one endpoint for all queries and mutations.
* Strongly Typed Schema: The schema provides a clear contract for the data structure.
* Self-Documentation: Built-in introspection allows tools like GraphQL Playground to help understand the API.

## Key Concepts
(i) Schema
The schema defines the structure of data your API can provide. It describes types and the relationships between them. It defines the structure of queries, mutations, and subscriptions, and enforces the types of data available.

(ii) Types
Types define the shape of the data. They are divided into two:

* Scalar Types: These are the basic types that GraphQL supports out-of-the-box. They represent single values and are the building blocks for defining your data. (e.g. Int, Float, String, Boolean, ID)
* Object Types: These types are used to represent more complex data structures and are composed of multiple fields, which may themselves be scalar types or other object types. (e.g. User, Post, etc.)

(iii) Fields
Fields are properties of object types. Each field has a name and a type that can be queried or mutated. (e.g. User Type has name, email, etc.)

(iv) Query
A query is used to fetch data. GraphQL queries are read-only. They specify the fields to be retrieved.

(v) Mutation
Mutations are used to modify server-side data, similar to POST, PUT, DELETE requests in REST. They often return the updated object to the client.

(vi) Subscriptions
Subscriptions allow the client to listen for real-time updates. When a specified event happens on the server (e.g., a new comment is posted), the server sends the updated data to the client.

(vii) Resolvers
Resolvers are functions in GraphQL responsible for fetching and populating data for the fields defined in a GraphQL schema. They serve as the link between the schema and the data source. Resolvers work with:

* Fields: A field resolver is responsible for providing data for a specific field within an object type. When a query asks for a particular field (e.g., User.name), GraphQL uses a field resolver to fetch the value for that field.
* Object Types: Object type resolvers help retrieve the data for each object defined in the schema. When a query requests an object type (e.g., User or Post), GraphQL uses the corresponding resolvers to retrieve the complete object.
* Queries: A query resolver is a function that retrieves data for a query operation. When a client requests data via a query (e.g., { users { name } }), the corresponding query resolver fetches the data from the backend.
* Mutations: A mutation resolver is a function that handles data modifications, such as creating, updating, or deleting data. When a client sends a mutation (e.g., creating a new user or updating a post), the mutation resolver modifies the data in the backend.

(viii) Arguments
Arguments in GraphQL allow you to filter or provide additional details to your query.

(ix) Fragments
Fragments allow you to reuse parts of queries. They help reduce redundancy when the same set of fields is needed in multiple places.

(x) Directives
Directives are special annotations that can be used in queries to modify the execution of the query. The two most common directives are:

@include: Conditionally include fields based on a variable.
@skip: Conditionally skip fields based on a variable.
(xi) Variables
Variables allow you to send dynamic inputs to a query or mutation, making it more flexible and reusable. Instead of hardcoding values in the query, variables are defined separately and passed along when executing the query.

<!--  -->
## Project Structure 

/my-graphql-project
│
├── src/
│   ├── api/
│   │   ├── resolvers/           # Resolver functions for queries, mutations, and subscriptions
│   │   │   ├── userResolvers.ts
│   │   │   ├── postResolvers.ts
│   │   │   └── index.ts         # Combine all resolvers in one file for easy import
│   │   ├── schema/              # GraphQL schema files (type definitions)
│   │   │   ├── userSchema.ts
│   │   │   ├── postSchema.ts
│   │   │   └── index.ts         # Combine all schemas in one file for easy import
│   │   ├── services/            # Service layer for business logic
│   │   │   ├── userService.ts
│   │   │   ├── postService.ts
│   │   │   └── index.ts         # Combine all services in one file for easy import
│   │   ├── middlewares/         # Middleware functions (authentication, error handling, etc.)
│   │   │   ├── authMiddleware.ts
│   │   │   ├── errorMiddleware.ts
│   │   │   └── index.ts
│   │   ├── data-sources/        # External data sources (Prisma, MongoDB, REST APIs, etc.)
│   │   │   ├── userDataSource.ts
│   │   │   └── postDataSource.ts
│   │   └── index.ts             # Combine all of the above for easy server setup
│   ├── config/                  # Configuration files (env variables, database setup, etc.)
│   │   ├── database.ts
│   │   ├── config.ts
│   │   └── index.ts
│   ├── generated/               # Generated files from GraphQL Code Generator (types, resolvers, etc.)
│   │   └── graphql.ts
│   ├── server.ts                # Main server entry point (e.g., ApolloServer setup)
│   ├── typedefs.ts              # Consolidate your type definitions here
│   └── utils/                   # Utility functions
│       └── dateUtils.ts
├── .env                          # Environment variables
├── .gitignore                    # Git ignore configuration
├── codegen.yml                   # GraphQL Codegen configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project dependencies and scripts
└── README.md                     

## Explanation of Folders and Files:
- /src/
This is the main directory where all application logic resides.

/api/: Contains the GraphQL-related files (schema, resolvers, and services).
/resolvers/: Resolver functions that handle queries and mutations.
Resolvers are organized by the resource they handle, e.g., userResolvers.ts, postResolvers.ts, and then combined in an index.ts.
/schema/: Contains your GraphQL type definitions (typeDefs).
Each type (e.g., userSchema.ts, postSchema.ts) is a separate file, which are combined in index.ts.
/services/: The service layer that contains business logic and calls to the database or external APIs.
/middlewares/: Contains custom middleware for authentication, error handling, logging, etc.
/data-sources/: Files related to fetching data, like Prisma models or REST API calls.
index.ts: A central file that imports and combines all resolvers, schema, services, etc., into a single export for ease of use.

- /config/
Contains all configuration files (e.g., database, environment variables, application-specific settings).

config.ts: Centralized configuration file to handle things like API keys, database settings, etc.
database.ts: Database connection and setup logic (e.g., Prisma client initialization).
- /generated/
Contains the auto-generated files when using tools like GraphQL Code Generator. It includes the TypeScript types, resolvers, and more that are generated from your GraphQL schema.

graphql.ts: Typically includes types and hooks related to GraphQL operations.
- /server.ts
This is the entry point of your application. It sets up the GraphQL server (e.g., Apollo Server), imports the schemas and resolvers, and starts the server.

/typedefs.ts
Contains consolidated GraphQL type definitions, typically used to import your schema files and export them in one place.

- /utils/
Contains utility functions, such as date formatting, string manipulation, or helper functions used across the app.

- /config/
Manages environment-specific settings (e.g., development, production).

## Other files
* GraphQL Code Generator (codegen.yml)
This file configures the GraphQL Code Generator to generate TypeScript types, resolvers, and other schema-related files automatically.

* package.json: Contains the project dependencies (e.g., Apollo Server, Prisma, etc.), along with useful scripts like start, dev, codegen, and lint.
* .env: Environment variables (e.g., database credentials, API keys).
* tsconfig.json: TypeScript configuration for the project.

## Best Practices
* Modularization: Split functionality into smaller modules (e.g., userResolvers.ts, postResolvers.ts) for easier maintenance and scalability.
* Layered Architecture: Separate GraphQL logic from business logic, database access, and middlewares.
* Code Generation: Use GraphQL Code Generator to auto-generate TypeScript types and reduce boilerplate.
* Context: Use context to share common objects (e.g., user session, database connections) across resolvers.
* Error Handling: Centralize error handling through middlewares for cleaner, more maintainable code.
* Testing: Write unit or integration tests to keep resolvers and services testable.
