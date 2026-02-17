import { z } from 'zod';

export const authorSchema = z.object({
  name: z.string().min(1).max(128),
  email: z.email().max(254),
});

const newsSchema = z.object({
  title: z.string().min(1).max(128),
  intro: z.string().min(1).max(500),
  content: z.string().min(1),
  authorId: z.number().int().positive(),
});

export const newsCreateSchema = newsSchema;

export const newsUpdateSchema = newsSchema.extend({
  published: z.boolean(),
});

export const baseQuerySchema = z.object({
  limit: z
    .string()
    .default('10')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && Number.isInteger(val) && val > 0, {
      message: 'Must be a positive integer',
    }),
  offset: z
    .string()
    .default('0')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && Number.isInteger(val) && val >= 0, {
      message: 'Must be a non-negative integer',
    }),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const newsQuerySchema = baseQuerySchema.extend({
  published: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
  authorId: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && Number.isInteger(val) && val > 0, {
      message: 'Must be a positive integer',
    })
    .optional(),
});

export const idParamSchema = z.object({
  id: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && Number.isInteger(val) && val > 0, {
      message: 'Must be a positive integer',
    }),
});

export const slugParamSchema = z.object({
  slug: z.string().min(1),
});
