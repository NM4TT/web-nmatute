import { expect, test, type Page, type ViewportSize } from '@playwright/test';

const DESKTOP_HEADER: string =  "div#desktop-header-content";
const MOBILE_HEADER: string =  "div#mobile-header-content";
const DESKTOP_SIZE: ViewportSize = { width: 1280, height: 720 };
const MOBILE_SIZE: ViewportSize = { width: 375, height: 812 };

test.describe('desktop header', () => {
    // Function to check desktop layout
    const checkDesktopLayout = async (page: Page) => {
        const header = page.locator("header");

        const mobileContent = header.locator(MOBILE_HEADER);
        await expect(mobileContent).not.toBeVisible();

        const desktopContent = header.locator(DESKTOP_HEADER);
        await expect(desktopContent).toBeVisible();

        const navigation = desktopContent.locator("div#navigation");
        await expect(navigation).toBeVisible();

        const logo = desktopContent.locator("div#logo");
        await expect(logo).toBeVisible();
    };

    // Function to check mobile layout
    const checkMobileLayout = async (page: Page) => {
        const header = page.locator("header");
        const desktopContent = header.locator(DESKTOP_HEADER);
        await expect(desktopContent).not.toBeVisible();

        const mobileContent = header.locator(MOBILE_HEADER);
        await expect(mobileContent).toBeVisible;
    };

    test('home page check - desktop', async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize(DESKTOP_SIZE);
        await checkDesktopLayout(page);
    });

    test('home page check - mobile', async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize(MOBILE_SIZE);
        await checkMobileLayout(page);
    });

    test('portfolio page check - desktop', async ({ page }) => {
        await page.goto("/portfolio");
        await page.setViewportSize(DESKTOP_SIZE);
        await checkDesktopLayout(page);
    });

    test('portfolio page check - mobile', async ({ page }) => {
        await page.goto("/portfolio");
        await page.setViewportSize(MOBILE_SIZE);
        await checkMobileLayout(page);
    });

    test('404 page check - desktop', async ({ page }) => {
        await page.goto("/404");
        await page.setViewportSize(DESKTOP_SIZE);
        await checkDesktopLayout(page);
    });

    test('404 page check - mobile', async ({ page }) => {
        await page.goto("/404");
        await page.setViewportSize(MOBILE_SIZE);
        await checkMobileLayout(page);
    });
});

test.describe('first-section', () => {
    // Function to check desktop layout
    const checkDesktopLayout = async (page: Page) => {
        const pageContent = page.locator("main");

        const sectionContent = pageContent.locator("section#first");
        await expect(sectionContent).toBeVisible();

        const mobileFirstLook = sectionContent.locator("div#mobile-first-look");
        await expect(mobileFirstLook).not.toBeVisible();

        const desktopFirstLook = sectionContent.locator("div#desktop-first-look");
        await expect(desktopFirstLook).toBeVisible();
    };

    // Function to check mobile layout
    const checkMobileLayout = async (page: Page) => {
        const pageContent = page.locator("main");

        const sectionContent = pageContent.locator("section#first");
        await expect(sectionContent).toBeVisible();

        const desktopFirstLook = sectionContent.locator("div#desktop-first-look");
        await expect(desktopFirstLook).not.toBeVisible();

        const mobileFirstLook = sectionContent.locator("div#mobile-first-look");
        await expect(mobileFirstLook).toBeVisible();
    };

    test('home page check - desktop', async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize(DESKTOP_SIZE);
        await checkDesktopLayout(page);
    });

    test('home page check - mobile', async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize(MOBILE_SIZE);
        await checkMobileLayout(page);
    });
});