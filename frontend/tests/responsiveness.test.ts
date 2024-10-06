import { expect, test, type Page, type ViewportSize } from '@playwright/test';


const DESKTOP_VIEWPORT: ViewportSize = { width: 1280, height: 720 };
const MOBILE_VIEWPORT: ViewportSize = { width: 375, height: 812 };
const DESKTOP_HEADER: string =  "div#desktop-header-content";
const MOBILE_HEADER: string =  "div#mobile-header-content";

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
        await page.setViewportSize(DESKTOP_VIEWPORT);
        await checkDesktopLayout(page);
    });

    test('home page check - mobile', async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize(MOBILE_VIEWPORT);
        await checkMobileLayout(page);
    });

    test('portfolio page check - desktop', async ({ page }) => {
        await page.goto("/portfolio");
        await page.setViewportSize(DESKTOP_VIEWPORT);
        await checkDesktopLayout(page);
    });

    test('portfolio page check - mobile', async ({ page }) => {
        await page.goto("/portfolio");
        await page.setViewportSize(MOBILE_VIEWPORT);
        await checkMobileLayout(page);
    });

    test('404 page check - desktop', async ({ page }) => {
        await page.goto("/404");
        await page.setViewportSize(DESKTOP_VIEWPORT);
        await checkDesktopLayout(page);
    });

    test('404 page check - mobile', async ({ page }) => {
        await page.goto("/404");
        await page.setViewportSize(MOBILE_VIEWPORT);
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
        await page.setViewportSize(DESKTOP_VIEWPORT);
        await checkDesktopLayout(page);
    });

    test('home page check - mobile', async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize(MOBILE_VIEWPORT);
        await checkMobileLayout(page);
    });
});

test.describe('CV heading', () => {
    test('responsive heading first-section desktop', async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize(DESKTOP_VIEWPORT);
        const sectionFirst = page.locator("section#first");
        const desktopFirstLook = sectionFirst.locator("div#desktop-first-look")
        await expect(desktopFirstLook).toBeVisible()
        const h1Elements = desktopFirstLook.locator("h1")
    
        const expectedH1Classes = "font-bold mb-4 md:text-4xl lg:text-5xl xl:text-6xl";
        const h1Count = await h1Elements.count();
    
        for (let i = 0; i < h1Count; i++) {
            await expect(h1Elements.nth(i)).toHaveClass(expectedH1Classes);
        }

        const h2Elements = desktopFirstLook.locator("h2");
        const expectedH2Classes = "font-medium mb-4 text-2xl lg:text-3xl xl:text-4xl";
        const h2Count = await h2Elements.count();
        
        for (let i = 0; i < h2Count; i++) {
            await expect(h2Elements.nth(i)).toHaveClass(expectedH2Classes);
        }
    });

    test('responsive heading first-section mobile', async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize(MOBILE_VIEWPORT);
        const sectionFirst = page.locator("section#first");
        const mobileFirstLook = sectionFirst.locator("div#mobile-first-look")
        await expect(mobileFirstLook).toBeVisible()
        const h1Elements = mobileFirstLook.locator("h1")
    
        const expectedH1Classes = "font-bold pb-4 max-xs:text-3xl max-sm:text-4xl max-md:text-5xl";
        const h1Count = await h1Elements.count();
    
        for (let i = 0; i < h1Count; i++) {
            await expect(h1Elements.nth(i)).toHaveClass(expectedH1Classes);
        }
    });
  
    test('responsive h2 cv-section', async ({ page }) => {
        await page.goto("/");
        const h2CvElements = page.locator("section.cv-section h2");
    
        // Define the expected classes
        const expectedCvH2Classes = [
            'text-2xl',
            'md:text-3xl',
            'lg:text-4xl',
            'xl:text-5xl'
        ];
    
        const h2CvCount = await h2CvElements.count();
    
        for (let i = 0; i < h2CvCount; i++) {
            const h2Element = h2CvElements.nth(i);
            // Get the actual classes of the h2 element
            const actualClasses = await h2Element.getAttribute('class');
    
            // Check if each expected class is present in the actual class list
            for (const expectedClass of expectedCvH2Classes) {
                expect(actualClasses).toContain(expectedClass);
            }
        }
    });
});