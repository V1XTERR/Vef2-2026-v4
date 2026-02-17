import { Prisma } from '@prisma/client';
import type { Context } from 'hono';

type ErrorResponse = {
  status: 404 | 409;
  message: string;
};

function mapPrismaError(error: unknown): ErrorResponse | undefined {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return undefined;
  }

  switch (error.code) {
    case 'P2002':
      return { status: 409, message: 'resource already exists' };

    case 'P2025':
      return { status: 404, message: 'resource not found' };

    case 'P2003':
      return {
        status: 409,
        message: 'cannot delete resource with dependencies',
      };

    default:
      return undefined;
  }
}

export function handleError(error: unknown, c: Context) {
  const mapped = mapPrismaError(error);
  if (mapped) {
    return c.json({ message: mapped.message }, mapped.status);
  }
  throw error;
}
