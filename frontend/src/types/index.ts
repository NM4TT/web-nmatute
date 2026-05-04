export type ContentType = {
    name: string;
    role: string;
    start: string;
    end: string;
    tasks: string[];
    title: string;
    url: string;
    difference?: string;
};

export type EducationItemType = {
    title: string;
    name: string;
    start: string;
    end: string;
};

export type WorkExperienceItemType = {
    name: string;
    role: string;
    start: string;
    end: string;
    tasks: string[];
    difference?: string;
};

export type ProjectItemType = {
    name: string;
    tags: string;
    url: string;
};

export type SocialMediaType = {
    name: string;
    icon: string;
    url: string;
};