import type { APIRoute } from 'astro';
import { generateLlmsFullTxt } from '../../lib/llms';

export const GET: APIRoute = async () => {
    const content = await generateLlmsFullTxt('es');
    return new Response(content, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
        },
    });
};
