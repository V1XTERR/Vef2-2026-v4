import { Hono } from 'hono';
import { authorsApi } from './authors.api.js';
import { newsApi } from './news.api.js';

export const api = new Hono();

const routes = [
  {
    href: '/',
    methods: ['GET'],
  },
  {
    href: '/authors',
    querystrings: ['limit', 'offset', 'order'],
    methods: ['GET', 'POST'],
  },
  {
    href: '/authors/:id',
    methods: ['GET', 'PATCH', 'DELETE'],
  },
  {
    href: '/news',
    querystrings: ['limit', 'offset', 'order', 'published', 'authorId'],
    methods: ['GET', 'POST'],
  },
  {
    href: '/news/:slug',
    methods: ['GET', 'PATCH', 'DELETE'],
  },
];

api.get('/', (c) => c.json(routes));
api.route('/authors', authorsApi);
api.route('/news', newsApi);
