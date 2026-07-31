import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod'; 

const contentSchema = z.union([
    z.object({
        text: z.string()
    }).passthrough(),
    z.object({
        items: z.array(z.any())
    }).passthrough(),
    z.object({
        hero: z.object({
            title: z.string(),
            quote: z.string(),
            image: z.string()
        }).passthrough(),
        sections: z.array(z.object({
            title: z.string(),
            image: z.string(),
            image_first: z.boolean().optional(),
            paragraphs: z.array(z.string())
        }))
    }).passthrough(),
    z.array(z.object({
        name: z.string(),
        icon: z.string().optional(),
        url: z.string()
    }))
]);

const dataCollection = defineCollection({
    loader: file("./content.yaml"),
    schema: contentSchema
});

const dataEsCollection = defineCollection({
    loader: file("./content.es.yaml"),
    schema: contentSchema
});

const portfolioCollection = defineCollection({
    loader: file("./portfolio.yaml"),
    schema: z.any()
});

export const collections = {
    'data': dataCollection,
    'data_es': dataEsCollection,
    'portfolio': portfolioCollection,
};