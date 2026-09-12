import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    media: z.array(z.string()).default([]),
    displayStructure: z.array(z.int().min(1).max(3)),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    date: z.coerce.date(),
  }).refine(
    (data) => {
      const totalStructure = data.displayStructure.reduce((sum, n) => sum + n, 0);
      return data.media.length === totalStructure;
    },
    {
      message: "La somme de displayStructure doit être égale au nombre total de médias (screens + videos)",
      path: ["displayStructure"],
    }
  ),
});

export const collections = {
  projects,
};