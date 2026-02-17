import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import {
  newsCreateSchema,
  newsUpdateSchema,
  newsQuerySchema,
  slugParamSchema,
} from '../schema.zod.js';
import { handleError } from '../lib/errors.js';
import { generateSlug } from '../lib/slug.js';
import { prisma } from '../lib/prisma.js';
import { zodErrorHook } from '../lib/validation.js';
import xss from 'xss';

export const newsApi = new Hono();

newsApi.get(
  '/',
  zValidator('query', newsQuerySchema, zodErrorHook),
  async (c) => {
    const { limit, offset, order, published, authorId } = c.req.valid('query');

    const where = {
      ...(published !== undefined && { published }),
      ...(authorId && { authorId }),
    };

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: order },
        include: { author: true },
      }),
      prisma.news.count({ where }),
    ]);

    return c.json({
      data: news,
      pagination: {
        total,
        limit,
        offset,
        count: news.length,
      },
    });
  },
);

newsApi.post(
  '/',
  zValidator('json', newsCreateSchema, zodErrorHook),
  async (c) => {
    const data = c.req.valid('json');

    const slug = generateSlug(data.title);

    try {
      const news = await prisma.news.create({
        data: {
          title: xss(data.title),
          intro: xss(data.intro),
          content: xss(data.content),
          authorId: data.authorId,
          slug,
        },
        include: { author: true },
      });

      return c.json(news, 201);
    } catch (error) {
      return handleError(error, c);
    }
  },
);

newsApi.get(
  '/:slug',
  zValidator('param', slugParamSchema, zodErrorHook),
  async (c) => {
    const { slug } = c.req.valid('param');

    const news = await prisma.news.findUnique({
      where: { slug },
      include: { author: true },
    });

    if (!news) {
      return c.json({ message: 'news not found' }, 404);
    }

    return c.json(news);
  },
);

newsApi.patch(
  '/:slug',
  zValidator('param', slugParamSchema, zodErrorHook),
  zValidator('json', newsUpdateSchema, zodErrorHook),
  async (c) => {
    const { slug } = c.req.valid('param');
    const data = c.req.valid('json');

    const updateData = {
      title: xss(data.title),
      intro: xss(data.intro),
      content: xss(data.content),
      published: data.published,
      authorId: data.authorId,
      slug: generateSlug(data.title),
    };

    try {
      const news = await prisma.news.update({
        where: { slug },
        data: updateData,
        include: { author: true },
      });

      return c.json(news);
    } catch (error) {
      return handleError(error, c);
    }
  },
);

newsApi.delete(
  '/:slug',
  zValidator('param', slugParamSchema, zodErrorHook),
  async (c) => {
    const { slug } = c.req.valid('param');

    try {
      await prisma.news.delete({
        where: { slug },
      });

      return c.json({ message: 'news deleted' });
    } catch (error) {
      return handleError(error, c);
    }
  },
);
