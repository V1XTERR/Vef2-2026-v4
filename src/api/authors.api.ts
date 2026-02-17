import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { authorSchema, baseQuerySchema, idParamSchema } from '../schema.zod.js';
import { handleError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';
import { zodErrorHook } from '../lib/validation.js';
import xss from 'xss';

export const authorsApi = new Hono();

authorsApi.get(
  '/',
  zValidator('query', baseQuerySchema, zodErrorHook),
  async (c) => {
    const { limit, offset, order } = c.req.valid('query');

    const [authors, total] = await Promise.all([
      prisma.author.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: order },
      }),
      prisma.author.count(),
    ]);

    return c.json({
      data: authors,
      pagination: {
        total,
        limit,
        offset,
        count: authors.length,
      },
    });
  },
);

authorsApi.post(
  '/',
  zValidator('json', authorSchema, zodErrorHook),
  async (c) => {
    const data = c.req.valid('json');

    try {
      const author = await prisma.author.create({
        data: {
          name: xss(data.name),
          email: xss(data.email),
        },
      });

      return c.json(author, 201);
    } catch (error) {
      return handleError(error, c);
    }
  },
);

authorsApi.get(
  '/:id',
  zValidator('param', idParamSchema, zodErrorHook),
  async (c) => {
    const { id } = c.req.valid('param');

    const author = await prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      return c.json({ message: 'author not found' }, 404);
    }

    return c.json(author);
  },
);

authorsApi.patch(
  '/:id',
  zValidator('param', idParamSchema, zodErrorHook),
  zValidator('json', authorSchema, zodErrorHook),
  async (c) => {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');

    try {
      const author = await prisma.author.update({
        where: { id },
        data: {
          name: xss(data.name),
          email: xss(data.email),
        },
      });

      return c.json(author);
    } catch (error) {
      return handleError(error, c);
    }
  },
);

authorsApi.delete(
  '/:id',
  zValidator('param', idParamSchema, zodErrorHook),
  async (c) => {
    const { id } = c.req.valid('param');

    try {
      await prisma.author.delete({
        where: { id },
      });

      return c.json({ message: 'author deleted' });
    } catch (error) {
      return handleError(error, c);
    }
  },
);
