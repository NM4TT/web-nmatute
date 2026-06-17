import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod'; 

const dataCollection = defineCollection({
    loader: file("./data.yaml"),
    // 2. Use the arrow function signature for the schema
    schema: () => z.any() 
});

export const collections = {
    'data': dataCollection,
};