import { defineCollection, z } from 'astro:content';

const article = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    subtitle: z.string(),
    category: z.enum([
      'rendering',
      'react-internals',
      'performance',
      'javascript-core',
      'browser-apis',
      'networking',
      'security',
      'architecture',
      'bundling',
      'accessibility',
    ]),
    icon: z.string(),
    description: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    tags: z.array(z.string()),
    related: z.array(z.string()),
    resources: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      })
    ),
    status: z.enum(['published', 'stub']).default('published'),
  }),
});

export const collections = { articles: article };
