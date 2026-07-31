import { getEntry } from 'astro:content';
import type { NavLinkType } from '#lib/types';

export const SUPPORTED_LANGUAGES = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
];

export async function getLocalizedEntry(lang: string, key: any) {
    if (lang !== 'en') {
        try {
            const entry = await getEntry(`data_${lang}` as any, key);
            if (entry) return entry.data;
        } catch (e) {
            // fallback
        }
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
        certifications: "Certifications",
        verifyCredential: "VERIFY",
        allCerts: "All",
        portfolioHeading: "Portfolio",
        portfolioSubtitle: "Some stuff that I am proud to show.",
        rightsReserved: "All rights reserved.",
        menuResume: "Resume",
        menuPortfolio: "Portfolio",
        menuBiography: "Biography",
        menuBlog: "Blog",
        menuServices: "Services",
        contactMe: "Contact Me",
        downloadCv: "Download CV",
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
        certifications: "Certificaciones",
        verifyCredential: "VERIFICAR",
        allCerts: "Todas",
        portfolioHeading: "Portafolio",
        portfolioSubtitle: "Algunas cosas que me enorgullece mostrar.",
        rightsReserved: "Todos los derechos reservados.",
        menuResume: "Currículum",
        menuPortfolio: "Portafolio",
        menuBiography: "Biografía",
        menuBlog: "Blog",
        menuServices: "Servicios",
        contactMe: "Contáctame",
        downloadCv: "Descargar CV",
        maintenanceTitle: "En Mantenimiento",
        maintenanceMessage: "Esta página se encuentra en mantenimiento en este momento, por favor regrese más tarde."
    }
};

export function getUiTranslation(lang: string) {
    return (UI_TRANSLATIONS as any)[lang] || UI_TRANSLATIONS.en;
}

export function getLocalizedMenu(lang: string): NavLinkType[] {
    const t = getUiTranslation(lang);
    const prefix = lang === 'en' ? '' : `/${lang}`;

    return [
        { name: t.menuResume, href: `${prefix}/` },
        { name: t.menuPortfolio, href: `${prefix}/portfolio/` },
        { name: t.menuBiography, href: `${prefix}/biography/` },
        { name: t.menuBlog, href: "https://blog.nmatute.com" },
        { name: t.menuServices, href: lang === 'es' ? "https://nmatute.dev/es/" : "https://nmatute.dev", external: true },
    ];
}
