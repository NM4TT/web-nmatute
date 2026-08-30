import type { APIRoute } from 'astro';
import { generateLlmsTxt } from '../../lib/llms';

export const GET: APIRoute = async () => {
    const content = await generateLlmsTxt('es');
    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
