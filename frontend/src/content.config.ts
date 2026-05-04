import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const dataCollection = defineCollection({
    // Point to the data.yaml in the project root
    loader: file("../data.yaml"),
    schema: z.object({
        items: z.array(z.any())
    })
});

export const collections = {
    'data': dataCollection,
};
