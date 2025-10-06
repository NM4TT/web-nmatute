import type { PageLoad } from './cv/$types';
import type { ContentType, EducationItemType, WorkExperienceItemType } from '$lib/types/index.js';

export const load: PageLoad  = async ({ fetch }) => {
    const res = await fetch('/app/data');

    if (!res.ok) {
        console.error("Failed to fetch data:", res.statusText);
        return {
            skills: [],
            languages: [],
            experience: [],
            education: []
        };
    }

    const { skills, languages, experience, education } = await res.json();

    const parsedExperience: WorkExperienceItemType[] = experience.map((item: ContentType) => ({
        name: item.name,
        role: item.role,
        start: item.start,
        end: item.end,
        tasks: item.tasks,
        difference: item.difference,
    }));

    const parsedEducation: EducationItemType[] = education.map((item: ContentType) => ({
        title: item.title,
        name: item.name,
        start: item.start,
        end: item.end,
    }));

    const parsedSkills: string[] = Array.isArray(skills) ? skills : [];
    const parsedLanguages: string[] = Array.isArray(languages) ? languages : [];

    return {
        skills: parsedSkills,
        languages: parsedLanguages,
        experience: parsedExperience,
        education: parsedEducation
    };
};
