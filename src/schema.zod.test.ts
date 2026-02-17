import { describe, test } from 'node:test';
import assert from 'node:assert';
import {
  authorSchema,
  newsCreateSchema,
  newsUpdateSchema,
  baseQuerySchema,
  newsQuerySchema,
  idParamSchema,
  slugParamSchema,
} from './schema.zod.js';

describe('authorSchema', () => {
  test('validates valid author data', () => {
    const result = authorSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
    });
    assert.strictEqual(result.success, true);
  });
});

describe('newsCreateSchema', () => {
  test('validates valid news creation data', () => {
    const result = newsCreateSchema.safeParse({
      title: 'Test News',
      intro: 'This is an intro',
      content: 'This is the content',
      authorId: 1,
    });
    assert.strictEqual(result.success, true);
  });
});

describe('newsUpdateSchema', () => {
  test('validates valid news update data', () => {
    const result = newsUpdateSchema.safeParse({
      title: 'Updated News',
      intro: 'Updated intro',
      content: 'Updated content',
      authorId: 1,
      published: true,
    });
    assert.strictEqual(result.success, true);
  });
});

describe('baseQuerySchema', () => {
  test('validates valid query parameters', () => {
    const result = baseQuerySchema.safeParse({
      limit: '20',
      offset: '10',
      order: 'asc',
    });
    assert.strictEqual(result.success, true);
  });
});

describe('newsQuerySchema', () => {
  test('validates valid news query parameters', () => {
    const result = newsQuerySchema.safeParse({
      limit: '10',
      offset: '0',
      order: 'desc',
      published: 'true',
      authorId: '5',
    });
    assert.strictEqual(result.success, true);
  });
});

describe('idParamSchema', () => {
  test('validates valid id parameter', () => {
    const result = idParamSchema.safeParse({ id: '123' });
    assert.strictEqual(result.success, true);
  });
});

describe('slugParamSchema', () => {
  test('validates valid slug parameter', () => {
    const result = slugParamSchema.safeParse({ slug: 'test-news-slug' });
    assert.strictEqual(result.success, true);
  });
});
