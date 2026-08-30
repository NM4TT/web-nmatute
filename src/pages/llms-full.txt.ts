import type { APIRoute } from 'astro';
import { generateLlmsFullTxt } from '../lib/llms';

export const GET: APIRoute = async () => {
    const content = await generateLlmsFullTxt('en');
    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
