import { getEntry } from 'astro:content';
import type { NavLinkType } from '#lib/types';

export async function getLocalizedEntry(lang: 'en' | 'es', key: any) {
    if (lang === 'es') {
        const entry = await getEntry('data_es', key);
        if (entry) return entry.data;
    }
    const entry = await getEntry('data', key);
    return entry?.data;
}

const UI_TRANSLATIONS = {
    en: {
        resumeTitle: "Nicolas Resume",
        biographyTitle: "Nicolas Biography",
        portfolioTitle: "Nicolas Portfolio",
        whoIAm: "Who I Am",
        workExperience: "Work Experience",
        education: "Education",
        toolsSkills: "Tools & Skills",
        languages: "Languages",
        portfolioHeading: "Portfolio",
        portfolioSubtitle: "Some stuff that I am proud to show.",
        rightsReserved: "All rights reserved.",
        menuResume: "Resume",
        menuPortfolio: "Portfolio",
        menuBiography: "Biography",
        menuBlog: "Blog",
        menuServices: "Services",
        contactMe: "Contact Me",
        maintenanceTitle: "Under Maintenance",
        maintenanceMessage: "This page is under maintenance right now, please come back later."
    },
    es: {
        resumeTitle: "Currículum de Nicolás",
        biographyTitle: "Biografía de Nicolás",
        portfolioTitle: "Portafolio de Nicolás",
        whoIAm: "Quién Soy",
        workExperience: "Experiencia Laboral",
        education: "Educación",
        toolsSkills: "Herramientas y Habilidades",
        languages: "Idiomas",
        portfolioHeading: "Portafolio",
        portfolioSubtitle: "Algunas cosas que me enorgullece mostrar.",
        rightsReserved: "Todos los derechos reservados.",
        menuResume: "Currículum",
        menuPortfolio: "Portafolio",
        menuBiography: "Biografía",
        menuBlog: "Blog",
        menuServices: "Servicios",
        contactMe: "Contáctame",
        maintenanceTitle: "En Mantenimiento",
        maintenanceMessage: "Esta página se encuentra en mantenimiento en este momento, por favor regrese más tarde."
    }
};

export function getUiTranslation(lang: 'en' | 'es') {
    return UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
}

export function getLocalizedMenu(lang: 'en' | 'es'): NavLinkType[] {
    const t = getUiTranslation(lang);
    const prefix = lang === 'es' ? '/es' : '';

    return [
        { name: t.menuResume, href: `${prefix}/` },
        { name: t.menuPortfolio, href: `${prefix}/portfolio/` },
        { name: t.menuBiography, href: `${prefix}/biography/` },
        { name: t.menuBlog, href: "https://blog.nmatute.com", external: true },
        { name: t.menuServices, href: lang === 'es' ? "https://nmatute.dev/es/" : "https://nmatute.dev", external: true },
    ];
}
