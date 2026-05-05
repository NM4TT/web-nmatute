export type ContentType = {
    name: string;
    start: string | number;
    end?: string | number;
    difference?: string;
    [key: string]: any;
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
    tools: string[];
    codebase: string;
    live?: string;
};

export type SocialMediaType = {
    name: string;
    icon: string;
    url: string;
};

export type BiographyType = {
    hero: {
        title: string;
        quote: string;
        image: string;
    };
    sections: {
        title: string;
        image: string;
        image_first?: boolean;
        paragraphs: string[];
    }[];
};