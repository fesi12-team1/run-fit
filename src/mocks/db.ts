import { Collection } from '@msw/data';
import z from 'zod';

export const crews = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    city: z.string(),
    image: z.string(),
    memberCount: z.number(),
    createdAt: z.string(),
  }),
});

crews.create({
  id: 0,
  name: '더미 크루',
  description: '이것은 더미 크루입니다.',
  city: '더미시',
  image: 'https://example.com/dummy.jpg',
  memberCount: 0,
  createdAt: new Date().toISOString(),
});
