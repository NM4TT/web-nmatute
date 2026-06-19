import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod'; 

const dataCollection = defineCollection({
    loader: file("./content.yaml"),
    schema: () => z.any() 
});

const dataEsCollection = defineCollection({
    loader: file("./content.es.yaml"),
    schema: () => z.any() 
});

export const collections = {
    'data': dataCollection,
    'data_es': dataEsCollection,
};