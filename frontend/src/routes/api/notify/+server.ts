import { json } from '@sveltejs/kit';
import { SERVER_URL } from '$env/static/private';

const NOTIFY_URL = `${SERVER_URL}/contact`

export async function POST({ request }: { request: Request }) {
    try {
        const { sender } = await request.json();

        const response = await fetch(NOTIFY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sender }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return json({ success: true });
    } catch (error) {
        console.error('Error in notify endpoint:', error);
        return json({ success: false }, { status: 500 });
    }
}