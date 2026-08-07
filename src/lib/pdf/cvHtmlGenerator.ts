import { formatNumericDate } from '../utils/index.js';

interface CvSocial {
    name: string;
    icon?: string;
    url: string;
}

interface CvExperienceItem {
    name: string;
    role: string;
    location?: string;
    start: number | string;
    end?: number | string;
    tasks?: string[];
}

interface CvEducationItem {
    name: string;
    title: string;
    location?: string;
    start: number | string;
    end?: number | string;
    tasks?: string[];
}

interface CvContactInfo {
    name?: string;
    location?: string;
    phone?: string;
    email?: string;
    website?: string;
}

export interface CvCertItem {
    id?: string;
    name: string;
    issuer?: string;
    credentialId?: string;
}

export interface CvData {
    contact?: CvContactInfo;
    about?: { text: string };
    skills?: { items?: Array<{ keywords?: string[] }> | string[] };
    'professional-exp'?: { items: CvExperienceItem[] };
    education?: { items: CvEducationItem[] };
    certs?: CvCertItem[];
    'tools-skills'?: { items: Array<{ keywords: string[] }> };
    languages?: { items: Array<{ keywords: string[] }> };
    socials?: CvSocial[];
}

function cleanUrlDisplay(url: string): string {
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function generateCvHtml(data: CvData, lang: string = 'en', mailto?: string, certs?: CvCertItem[]): string {
    const isEs = lang === 'es';

    const candidateName = data.contact?.name || (isEs ? 'Manuel Nicolás Matute' : 'Manuel Nicolas Matute');
    const email = mailto || data.contact?.email || 'contact@nmatute.com';

    let websiteUrl = data.contact?.website || 'www.nmatute.com';
    if (data.socials && Array.isArray(data.socials)) {
        const personalSite = data.socials.find(s => s.name.toLowerCase() === 'website' || s.name.toLowerCase() === 'portfolio');
        if (personalSite?.url) {
            websiteUrl = cleanUrlDisplay(personalSite.url);
        }
    }
    const fullWebsiteHref = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;

    const labels = {
        summary: isEs ? 'Resumen' : 'Summary',
        website: isEs ? 'Sitio Web' : 'Website',
        experience: isEs ? 'Experiencia' : 'Experience',
        education: isEs ? 'Educación' : 'Education',
        certifications: isEs ? 'Certificaciones' : 'Certifications',
        skills: isEs ? 'Habilidades' : 'Skills',
        languages: isEs ? 'Idiomas' : 'Languages',
        techStack: isEs ? 'Stack Tecnológico' : 'Tech Stack',
        present: isEs ? 'Presente' : 'Present'
    };

    // Summary
    const summaryText = data.about?.text;

    // Experience items (Sorted newest first)
    const expItems = (data['professional-exp']?.items || []).slice().sort((a, b) => Number(b.start) - Number(a.start));

    // Education items (Sorted newest first)
    const eduItems = (data.education?.items || []).slice().sort((a, b) => Number(b.start) - Number(a.start));

    // Certifications list
    const certList = certs || data.certs || [];
    const certText = certList.map(c => c.id ? `${c.name} (${c.id.toUpperCase()})` : c.name).join(', ');

    // Soft Skills list
    let softSkillList: string[] = [];
    if (data.skills?.items) {
        if (Array.isArray(data.skills.items)) {
            softSkillList = data.skills.items.flatMap(i => typeof i === 'string' ? [i] : (i.keywords || []));
        }
    }

    // Tech Stack list
    const techStackList = (data['tools-skills']?.items || []).flatMap(i => i.keywords || []);

    // Languages list
    const langList = (data.languages?.items || []).flatMap(i => i.keywords || []);

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${candidateName} - Resume</title>
  <style>
    @page {
      size: letter portrait;
      margin: 0.4in;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, Helvetica, 'Liberation Sans', sans-serif;
      font-size: 9.5pt;
      line-height: 1.25;
      color: #000000;
      background-color: #ffffff;
      padding: 0.4in;
      text-align: left;
      -webkit-print-color-adjust: exact;
    }

    /* Header Styling */
    .header {
      margin-bottom: 14pt;
    }
    .candidate-name {
      font-size: 18pt;
      font-weight: bold;
      color: #000000;
      line-height: 1.1;
      margin-bottom: 4pt;
    }
    .contact-line {
      font-size: 9.5pt;
      color: #000000;
      line-height: 1.3;
    }
    .contact-line a {
      color: #0000ee;
      text-decoration: underline;
    }

    /* Section Headings & Dividers */
    .section-block {
      margin-bottom: 10pt;
    }
    .section-title {
      font-size: 11.5pt;
      font-weight: bold;
      color: #000000;
      margin-bottom: 2pt;
    }
    .section-divider {
      border: none;
      border-top: 1px solid #777777;
      margin-bottom: 6pt;
    }

    .body-text {
      font-size: 9.5pt;
      line-height: 1.25;
      color: #000000;
    }

    /* Experience & Education Entries */
    .entry-block {
      margin-bottom: 8pt;
      page-break-inside: avoid;
    }
    .entry-line-1 {
      font-size: 9.5pt;
      color: #000000;
      line-height: 1.2;
    }
    .entry-line-1 strong {
      font-weight: bold;
    }
    .entry-line-2 {
      font-size: 9.5pt;
      color: #000000;
      line-height: 1.2;
      margin-top: 1pt;
      margin-bottom: 3pt;
    }
    .entry-line-2 strong {
      font-weight: bold;
    }

    /* Bullet Points */
    .bullet-list {
      margin-left: 0.22in;
      list-style-type: disc;
      margin-top: 3pt;
    }
    .bullet-list li {
      font-size: 9.5pt;
      line-height: 1.25;
      color: #000000;
      margin-bottom: 2pt;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <header class="header">
    <h1 class="candidate-name">${candidateName}</h1>
    ${email ? `<div class="contact-line">${email}</div>` : ''}
  </header>

  <!-- Summary Section -->
  ${summaryText ? `
  <section class="section-block">
    <h2 class="section-title">${labels.summary}</h2>
    <hr class="section-divider" />
    <p class="body-text">${summaryText}</p>
  </section>
  ` : ''}

  <!-- Website Section -->
  ${websiteUrl ? `
  <section class="section-block">
    <h2 class="section-title">${labels.website}</h2>
    <hr class="section-divider" />
    <p class="body-text"><a href="${fullWebsiteHref}" style="color: #0000ee; text-decoration: underline;">${websiteUrl}</a></p>
  </section>
  ` : ''}

  <!-- Work Experience Section -->
  ${expItems.length > 0 ? `
  <section class="section-block">
    <h2 class="section-title">${labels.experience}</h2>
    <hr class="section-divider" />
    ${expItems.map(item => {
        const startDate = formatNumericDate(item.start, lang);
        const endDate = formatNumericDate(item.end, lang);
        const dateRange = `${startDate} - ${endDate}`;

        const companyHeader = item.location
            ? `<strong>${item.name}</strong> | ${item.location}`
            : `<strong>${item.name}</strong>`;

        return `
        <div class="entry-block">
          <div class="entry-line-1">${companyHeader}</div>
          <div class="entry-line-2"><strong>${item.role}</strong> | ${dateRange}</div>
          ${item.tasks && item.tasks.length > 0 ? `
          <ul class="bullet-list">
            ${item.tasks.map(task => `<li>${task}</li>`).join('\n            ')}
          </ul>
          ` : ''}
        </div>
        `;
    }).join('\n')}
  </section>
  ` : ''}

  <!-- Education Section -->
  ${(eduItems.length > 0 || certList.length > 0) ? `
  <section class="section-block">
    <h2 class="section-title">${labels.education}</h2>
    <hr class="section-divider" />
    ${eduItems.map(item => {
        const startDate = formatNumericDate(item.start, lang);
        const endDate = item.end ? formatNumericDate(item.end, lang) : '';
        const dateRange = endDate ? `${startDate} - ${endDate}` : (startDate ? `${startDate} - ${labels.present}` : '');

        const eduHeader = item.location
            ? `<strong>${item.name}</strong> | ${item.location}`
            : `<strong>${item.name}</strong>`;

        const titleLine = dateRange ? `<strong>${item.title}</strong> | ${dateRange}` : `<strong>${item.title}</strong>`;

        return `
        <div class="entry-block">
          <div class="entry-line-1">${eduHeader}</div>
          <div class="entry-line-2">${titleLine}</div>
          ${item.tasks && item.tasks.length > 0 ? `
          <ul class="bullet-list">
            ${item.tasks.map(task => `<li>${task}</li>`).join('\n            ')}
          </ul>
          ` : ''}
        </div>
        `;
    }).join('\n')}
    ${certList.length > 0 ? `
    <div class="entry-block" style="margin-top: 6pt;">
      <div class="entry-line-1"><strong>${labels.certifications}</strong></div>
      <p class="body-text">${certText}</p>
    </div>
    ` : ''}
  </section>
  ` : ''}

  <!-- Skills Section -->
  ${softSkillList.length > 0 ? `
  <section class="section-block">
    <h2 class="section-title">${labels.skills}</h2>
    <hr class="section-divider" />
    <p class="body-text">${softSkillList.join(', ')}</p>
  </section>
  ` : ''}

  <!-- Languages Section -->
  ${langList.length > 0 ? `
  <section class="section-block">
    <h2 class="section-title">${labels.languages}</h2>
    <hr class="section-divider" />
    <p class="body-text">${langList.join(', ')}</p>
  </section>
  ` : ''}

  <!-- Tech Stack Section -->
  ${techStackList.length > 0 ? `
  <section class="section-block">
    <h2 class="section-title">${labels.techStack}</h2>
    <hr class="section-divider" />
    <p class="body-text">${techStackList.join(', ')}.</p>
  </section>
  ` : ''}

</body>
</html>`;
}

