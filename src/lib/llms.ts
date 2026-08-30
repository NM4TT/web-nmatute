import { getLocalizedEntry, getUiTranslation } from './i18n';
import { getEntry } from 'astro:content';
import { formatItemDates } from './utils';

export async function generateLlmsTxt(lang: 'en' | 'es' = 'en'): Promise<string> {
    const isEs = lang === 'es';
    const aboutData = await getLocalizedEntry(lang, 'about');
    const aboutText = aboutData?.text || (isEs 
        ? "Desarrollador de software con experiencia en soluciones Full-Stack, arquitectura y DevOps."
        : "Software developer with experience in Full-Stack solutions, software architecture, and DevOps.");
    
    const projectsEntry = await getEntry('portfolio', 'projects');
    const projects: Array<{ name: string; tools: string[]; codebase?: string; live?: string }> = projectsEntry?.data || [];
    
    const skillsData = await getLocalizedEntry(lang, 'tools-skills');
    const skillsList = (skillsData?.items || []).flatMap((item: any) => item.keywords || []);
    const topSkills = skillsList.slice(0, 15).join(', ');

    const title = isEs 
        ? "# Nicolás Matute - Desarrollador de Software y Consultor" 
        : "# Nicolas Matute - Software Developer & Consultant";

    const sections = [
        title,
        "",
        `> ${aboutText}`,
        "",
        isEs ? "## Información General y Enlaces Clave" : "## Core Information & Key Links",
        isEs
            ? "- [Currículum Completo (llms-full.txt)](https://nmatute.com/es/llms-full.txt): Experiencia laboral detallada, educación, habilidades técnicas y proyectos."
            : "- [Full Resume (llms-full.txt)](https://nmatute.com/llms-full.txt): Comprehensive work experience, education, technical skills, and projects.",
        isEs
            ? "- [Biografía](https://nmatute.com/es/biography/): Historia profesional y trayectoria personal."
            : "- [Biography](https://nmatute.com/biography/): Personal background and professional engineering journey.",
        isEs
            ? "- [Portafolio](https://nmatute.com/es/portfolio/): Proyectos destacados y aplicaciones web."
            : "- [Portfolio](https://nmatute.com/portfolio/): Featured projects and web applications.",
        isEs
            ? "- [Blog Técnico](https://blog.nmatute.com/es/llms.txt): Artículos sobre robótica, ingeniería de software y arquitectura cloud."
            : "- [Technical Blog](https://blog.nmatute.com/llms.txt): Technical articles on robotics, software engineering, and cloud architecture.",
        "",
        isEs ? "## Habilidades Técnicas Principales" : "## Key Technical Skills",
        `- **${isEs ? "Tecnologías destacadas" : "Core Tech"}**: ${topSkills}`,
        isEs
            ? "- **Especialidades**: Microservicios, APIs (REST, SOAP, GraphQL, gRPC), CI/CD (ArgoCD, Jenkins, Kargo), Kubernetes, Desarrollo Full-Stack (Go, Java, TypeScript, Python, Svelte)."
            : "- **Specialties**: Microservices, APIs (REST, SOAP, GraphQL, gRPC), CI/CD (ArgoCD, Jenkins, Kargo), Kubernetes, Full-Stack Development (Go, Java, TypeScript, Python, Svelte).",
        "",
        isEs ? "## Proyectos Destacados" : "## Featured Projects",
        ...projects.map(p => {
            const links = [];
            if (p.live) links.push(`[Live](${p.live})`);
            if (p.codebase) links.push(`[Code](${p.codebase})`);
            const linksStr = links.length > 0 ? ` (${links.join(' | ')})` : '';
            return `- **${p.name}**${linksStr}: ${p.tools?.join(', ')}`;
        }),
        "",
        isEs ? "## Contacto y Redes" : "## Contact & Socials",
        "- **Website**: https://nmatute.com",
        "- **GitHub**: https://github.com/NM4TT",
        "- **LinkedIn**: https://linkedin.com/in/nmatute-dev",
        "- **Instagram**: https://instagram.com/nmatute.dev",
        "",
        isEs ? "## Variantes de Idioma" : "## Language Variants",
        isEs
            ? "- [English Version (llms.txt)](https://nmatute.com/llms.txt): Summary index in English.\n- [English Full Resume (llms-full.txt)](https://nmatute.com/llms-full.txt): Complete resume in English."
            : "- [Versión en Español (llms.txt)](https://nmatute.com/es/llms.txt): Índice resumido en español.\n- [Versión Completa en Español (llms-full.txt)](https://nmatute.com/es/llms-full.txt): Currículum completo en español."
    ];

    return sections.join('\n') + '\n';
}

export async function generateLlmsFullTxt(lang: 'en' | 'es' = 'en'): Promise<string> {
    const isEs = lang === 'es';
    
    const aboutData = await getLocalizedEntry(lang, 'about');
    const aboutText = aboutData?.text || "";

    const rawExperience = (await getLocalizedEntry(lang, 'professional-exp'))?.items || [];
    const experience = formatItemDates(rawExperience, lang);

    const rawEducation = (await getLocalizedEntry(lang, 'education'))?.items || [];
    const education = formatItemDates(rawEducation, lang);

    const rawSkills = (await getLocalizedEntry(lang, 'tools-skills'))?.items || [];
    const skills = rawSkills.flatMap((item: any) => item.keywords || []);

    const rawLanguages = (await getLocalizedEntry(lang, 'languages'))?.items || [];
    const languages = rawLanguages.flatMap((item: any) => item.keywords || []);

    const bioData = await getLocalizedEntry(lang, 'biography');
    const bioSections = bioData?.sections || [];

    const projectsEntry = await getEntry('portfolio', 'projects');
    const projects: Array<{ name: string; tools: string[]; codebase?: string; live?: string }> = projectsEntry?.data || [];

    const lines: string[] = [
        isEs ? "# Nicolás Matute - Perfil Profesional Completo & Portafolio" : "# Nicolas Matute - Full Professional Profile & Portfolio",
        "",
        `> ${aboutText}`,
        "",
        isEs ? "## Resumen Ejecutivo" : "## Executive Summary",
        aboutText,
        "",
        isEs ? "## Experiencia Profesional" : "## Professional Experience",
        ...experience.map((exp: any) => {
            const dateRange = `${exp.start} - ${exp.end}${exp.difference ? ` (${exp.difference})` : ''}`;
            const tasks = (exp.tasks || []).map((task: string) => `  - ${task}`).join('\n');
            return `### ${exp.role} — ${exp.name}\n*${dateRange}*\n\n${tasks}\n`;
        }),
        isEs ? "## Habilidades Técnicas y Herramientas" : "## Technical Skills & Tools",
        skills.map((skill: string) => `- ${skill}`).join('\n'),
        "",
        isEs ? "## Educación" : "## Education",
        ...education.map((edu: any) => {
            return `- **${edu.title}** — ${edu.name} (${edu.start || ''})`;
        }),
        "",
        isEs ? "## Idiomas" : "## Languages",
        languages.map((l: string) => `- ${l}`).join('\n'),
        "",
        isEs ? "## Portafolio de Proyectos" : "## Portfolio Projects",
        ...projects.map((p) => {
            const links = [];
            if (p.live) links.push(`[Live Website](${p.live})`);
            if (p.codebase) links.push(`[Source Code](${p.codebase})`);
            const linksStr = links.length > 0 ? `\n- **Links**: ${links.join(' | ')}` : '';
            return `### ${p.name}\n- **Technologies**: ${p.tools?.join(', ')}${linksStr}\n`;
        }),
        isEs ? "## Biografía Personal" : "## Personal Biography",
        bioData?.hero?.quote ? `*${bioData.hero.quote}*\n` : '',
        ...bioSections.map((sec: any) => {
            const paragraphs = (sec.paragraphs || []).join('\n\n');
            return `### ${sec.title}\n\n${paragraphs}\n`;
        }),
        isEs ? "## Contacto y Enlaces" : "## Contact & Links",
        "- **Website**: https://nmatute.com",
        "- **Blog**: https://blog.nmatute.com",
        "- **GitHub**: https://github.com/NM4TT",
        "- **LinkedIn**: https://linkedin.com/in/nmatute-dev",
        "- **Instagram**: https://instagram.com/nmatute.dev"
    ];

    return lines.filter(line => line !== undefined).join('\n') + '\n';
}
