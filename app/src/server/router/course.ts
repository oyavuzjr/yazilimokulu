import { createRouter } from './context';
import { z } from 'zod';

export const courseRouter = createRouter()
  .query('get', {
    input: z
      .object({
        slug: z.string(),
        part: z.number().nullish(),
      })
      .nullish(),
    resolve({ input, ctx }) {
      return ctx.prisma.course.findUnique({ where: { slug: input?.slug } });
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });
