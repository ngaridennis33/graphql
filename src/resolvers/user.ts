// src/resolvers/userResolvers.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const users = {
  queries: {
    users: () => prisma.user.findMany(),
    user: (_: any, args: { id: string }) => prisma.user.findUnique({ where: { id: Number(args.id) } }),
  },
  mutations: {
    createUser: (_: any, args: { email: string, name: string }) =>
      prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
        },
      }),
  },
  User: {
    posts: (parent: { id: number }) =>
      prisma.post.findMany({
        where: { authorId: parent.id },
      }),
  },
};