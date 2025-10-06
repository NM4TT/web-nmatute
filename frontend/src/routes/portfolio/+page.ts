import type { PageLoad } from './$types';
import type { ProjectItemType } from '$lib/types/index.js';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/app/data');
    if (!res.ok) {
        console.error("Failed to fetch data:", res.statusText);
        return {
            projects: []
        };
    }

    const { projects } = await res.json();

    const parsedProjects: ProjectItemType[] = projects.map((item: ProjectItemType) => ({
        name: item.name,
        tags: item.tags,
        url: item.url,
    }));

    return {
        projects: parsedProjects
    };
};