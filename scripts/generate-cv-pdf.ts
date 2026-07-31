import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import * as yaml from 'js-yaml';
import { generateCvHtml, type CvData } from '../src/lib/pdf/cvHtmlGenerator.js';

function loadEnvMailto(rootDir: string): string | undefined {
    if (process.env.PUBLIC_MAILTO) {
        return process.env.PUBLIC_MAILTO;
    }
    const envPath = path.join(rootDir, '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const match = envContent.match(/PUBLIC_MAILTO\s*=\s*(.+)/);
        if (match) {
            return match[1].trim().replace(/^['"]|['"]$/g, '');
        }
    }
    return undefined;
}

async function main() {
    const rootDir = process.cwd();
    const publicCvDir = path.join(rootDir, 'public', 'cv');
    const mailto = loadEnvMailto(rootDir);

    if (!fs.existsSync(publicCvDir)) {
        fs.mkdirSync(publicCvDir, { recursive: true });
    }

    // Discover all content files (content.yaml, content.es.yaml, content.fr.yaml, etc.)
    const rootFiles = fs.readdirSync(rootDir);
    const contentFiles = rootFiles.filter(file => file === 'content.yaml' || /^content\.[a-z]{2}\.yaml$/i.test(file));
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Read portfolio.yaml if certs are present
    let portfolioCerts: any[] | undefined = undefined;
    const portfolioPath = path.join(rootDir, 'portfolio.yaml');
    if (fs.existsSync(portfolioPath)) {
        try {
            const rawPortfolio = fs.readFileSync(portfolioPath, 'utf-8');
            const parsedPortfolio = yaml.load(rawPortfolio) as { certs?: any[] };
            if (parsedPortfolio && Array.isArray(parsedPortfolio.certs) && parsedPortfolio.certs.length > 0) {
                portfolioCerts = parsedPortfolio.certs;
            }
        } catch {
            // Ignore portfolio parse error
        }
    }

    try {
        for (const file of contentFiles) {
            let lang = 'en';
            if (file !== 'content.yaml') {
                const match = file.match(/^content\.([a-z]{2})\.yaml$/i);
                if (match) lang = match[1].toLowerCase();
            }

            const filePath = path.join(rootDir, file);
            const rawYaml = fs.readFileSync(filePath, 'utf-8');
            const data = yaml.load(rawYaml) as CvData;

            const html = generateCvHtml(data, lang, mailto, portfolioCerts);
            const page = await browser.newPage();

            await page.setContent(html, { waitUntil: 'networkidle0' });

            const pdfPath = path.join(publicCvDir, `cv-${lang}.pdf`);
            await page.pdf({
                path: pdfPath,
                format: 'Letter',
                printBackground: true,
                margin: {
                    top: '0in',
                    right: '0in',
                    bottom: '0in',
                    left: '0in'
                }
            });

            await page.close();
        }
    } finally {
        await browser.close();
    }
}

main().catch(err => {
    console.error('❌ Error generating CV PDFs:', err);
    process.exit(1);
});
