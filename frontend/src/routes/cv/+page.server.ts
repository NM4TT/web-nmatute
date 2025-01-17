import { getKeywords, getContent } from '$lib/server/api';
import { formatItemDates } from '$lib/utils';

export const load = async () => {
    const skills = await getKeywords("tools-skills");
    const languages = await getKeywords("languages");

    const experience = formatItemDates(
        await getContent("professional-exp", ["name", "role", "start", "end", "tasks"])
    );

    const education = formatItemDates(
        await getContent("education", ["name", "title", "start", "end"])
    );

    return {
        skills,
        languages,
        experience,
        education,
    };
};