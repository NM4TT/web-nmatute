const DATA_URL = (import.meta.env.PUBLIC_SERVER_URL) ? 
    `${import.meta.env.PUBLIC_SERVER_URL}/query` : 'http://backend/query';
const NOTIFY_URL = (import.meta.env.PUBLIC_SERVER_URL) ? 
    `${import.meta.env.PUBLIC_SERVER_URL}/contact` : 'http://backend/contact';

export type Content = {
    name: string;
    role: string;
    start: string;
    end: string;
    tasks: string[];
    title: string;
    url: string;
    difference?: string;
};

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

export async function getContent(name: string, contentFields: string[]): Promise<Content[]> {
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
    const items: Content[] = json.data.getData.items.map((item: { content: any; }) => (item.content));

    return items;
}

export async function notify(email: string): Promise<boolean> {
    let done: boolean = false;
    const payload = {
        sender: email,
    };

    try {
        const response = await fetch(NOTIFY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        done = true;
    } catch (error) {
        console.error('Error Notifying:', error);
    }
    return done;
}