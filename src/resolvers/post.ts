// src/resolvers/postResolvers.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const posts = {
  queries: {
    posts: () => prisma.post.findMany(),
    post: (_: any, args: { id: string }) => prisma.post.findUnique({ where: { id: Number(args.id) } }),
  },
  mutations: {
    createPost: (_: any, args: { title: string, content: string, authorId: number }) =>
      prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          authorId: args.authorId,
        },
      }),
  },
  Post: {
    author: (parent: { authorId: number }) =>
      prisma.user.findUnique({
        where: { id: parent.authorId },
      }),
  },
};