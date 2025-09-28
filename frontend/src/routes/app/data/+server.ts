import { BACKEND_ORIGIN } from '$env/static/private';
import type { ContentType } from '$lib/types/index.js';
import { formatItemDates, formatProjects } from '$lib/utils/index.js';

const DATA_URL = `${BACKEND_ORIGIN}/query`

export async function GET() {
    const skills = await getKeywords("tools-skills");
    const languages = await getKeywords("languages");

    const experience = formatItemDates(
        await getContent("professional-exp", [
        "name",
        "role",
        "start",
        "end",
        "tasks",
        ])
    );

    const education = formatItemDates(
        await getContent("education", [
        "name",
        "title",
        "start",
        "end",
        ])
    );

    const projects = formatProjects(
        await getContent("projects", ["name", "url"])
    );

    return new Response(
        JSON.stringify({
            skills,
            languages,
            experience,
            education,
            projects,
        }),
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

async function getKeywords(name: string): Promise<string[]> {
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

    const content = await response.json();
    const items = content.data.getData.items;

    const keywords: string[] = items.flatMap((item: { keywords: any; }) => item.keywords || []);

    return keywords;
}

async function getContent(name: string, contentFields: string[]): Promise<ContentType[]> {
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

    const content = await response.json();
    const items: ContentType[] = content.data.getData.items.map((item: { content: any; }) => (item.content));

    return items;
}