const endpoint = import.meta.env.GRAPHQL_URL;

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
  
type Item = {
    keywords?: string[];
    content?: Content;
};

export async function getKeywords(name: string): Promise<string[]> {
    const response = await fetch(endpoint, {
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

    const response = await fetch(endpoint, {
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
