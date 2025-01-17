import { getContent } from '$lib/server/api';
import { formatProjects } from '$lib/utils';

export const load = async () => {
    const projects = formatProjects(
        await getContent("projects", ["name", "url"])
    );

    return {
        projects,
    };
};