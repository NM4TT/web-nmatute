import type { ContentType } from '$lib/types';
import { SERVER_URL } from '$env/static/private';

const DATA_URL = `${SERVER_URL}/query`

export async function getKeywords(name: string): Promise<string[]> {
    const response = await fetch(DATA_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query getData($name: String!) {
                    getData(name: $name) {
                        items {
                            keywords
                        }
                    }
                }
            `,
            variables: {
                name: name,
            },
        }),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const json = await response.json();
    const items = json.data.getData.items;

    const keywords: string[] = items.flatMap((item: { keywords: any; }) => item.keywords || []);

    return keywords;
}

export async function getContent(name: string, contentFields: string[]): Promise<ContentType[]> {
    const fieldsString = contentFields.join('\n');

    const response = await fetch(DATA_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query getData($name: String!) {
                    getData(name: $name) {
                        items {
                            content {
                                ${fieldsString}
                            }
                        }
                    }
                }
            `,
            variables: {
                name: name,
            },
        }),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const json = await response.json();
    const items: ContentType[] = json.data.getData.items.map((item: { content: any; }) => (item.content));

    return items;
}

