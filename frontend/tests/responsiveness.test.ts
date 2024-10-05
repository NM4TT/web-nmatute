import { expect, test, type Page, type ViewportSize } from '@playwright/test';

const DESKTOP_DIV: string =  "div#desktop-header-content";
const DESKTOP_SIZE: ViewportSize = { width: 1280, height: 720 };
const MOBILE_SIZE: ViewportSize = { width: 375, height: 812 };

test.describe('desktop header', () => {
    // Function to check desktop layout
    const checkDesktopLayout = async (page: Page) => {
        const header = page.locator('header');

        const desktopHeaderContent = header.locator(DESKTOP_DIV);
        await expect(desktopHeaderContent).toBeVisible();

        const navigation = desktopHeaderContent.locator('div#navigation');
        await expect(navigation).toBeVisible();

        const logo = desktopHeaderContent.locator('div#logo');
        await expect(logo).toBeVisible();
    };

    // Function to check mobile layout
    const checkMobileLayoutAbsence = async (page: Page) => {
        const header = page.locator('main');
        await expect(header).toBeVisible();

        const desktopHeaderContent = header.locator(DESKTOP_DIV);
        await expect(desktopHeaderContent).not.toBeVisible();
    };

    test('home page check - desktop', async ({ page }) => {
        await page.goto('/');
        await page.setViewportSize(DESKTOP_SIZE); // Set for desktop
        await checkDesktopLayout(page);
    });

    test('home page check - mobile', async ({ page }) => {
        await page.goto('/');
        await page.setViewportSize(MOBILE_SIZE); // Set for mobile
        await checkMobileLayoutAbsence(page);
    });

    test('portfolio page check - desktop', async ({ page }) => {
        await page.goto('/portfolio');
        await page.setViewportSize(DESKTOP_SIZE); // Set for desktop
        await checkDesktopLayout(page);
    });

    test('portfolio page check - mobile', async ({ page }) => {
        await page.goto('/portfolio');
        await page.setViewportSize(MOBILE_SIZE); // Set for mobile
        await checkMobileLayoutAbsence(page);
    });

    test('404 page check - desktop', async ({ page }) => {
        await page.goto('/404');
        await page.setViewportSize(DESKTOP_SIZE); // Set for desktop
        await checkDesktopLayout(page);
    });

    test('404 page check - mobile', async ({ page }) => {
        await page.goto('/404');
        await page.setViewportSize(MOBILE_SIZE); // Set for mobile
        await checkMobileLayoutAbsence(page);
    });
});