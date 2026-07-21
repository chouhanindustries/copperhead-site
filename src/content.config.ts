import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** Shown on the index card and used as the meta description, so keep it a full sentence. */
    description: z.string(),
    date: z.coerce.date(),
    /** Short mono label on the index, e.g. 'Product' or 'Engineering'. */
    kind: z.string(),
    /** Path to the post's pitch deck PDF, referenced in the body as {frontmatter.deck}. */
    deck: z.string().optional(),
  }),
});

export const collections = { blog };
