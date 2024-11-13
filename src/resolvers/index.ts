// src/resolvers/index.ts
import { users } from './user';
import { posts } from './post';

export const resolvers = {
  Query: {
    ...users.queries,
    ...posts.queries,
  },
  Mutation: {
    ...users.mutations,
    ...posts.mutations,
  },
  User: users.User,
  Post: posts.Post,
};