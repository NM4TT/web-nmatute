import { expect, test } from '@playwright/test';

test.describe('wrapped by main', () => {
	test('biography page check', async ({ page }) => {
		await page.goto('/biography');
		await expect(page.locator('main')).toBeVisible();
	});

	test('cv page check', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('main')).toBeVisible();
	});

	test('portfolio page check', async ({ page }) => {
		await page.goto('/portfolio');
		await expect(page.locator('main')).toBeVisible();
	});

	test('404 page check', async ({ page }) => {
		await page.goto('/404');
		await expect(page.locator('main')).toBeVisible();
	});
});

test.describe('has basic layout', () => {
	test('home page check', async ({ page }) => {
		await page.goto('/');
		const header = page.locator('header#top');
		await expect(header).toBeVisible();
		const nav = header.locator('nav');
		await expect(nav).toBeVisible();
		await expect(page.locator('footer')).toBeVisible()
	});

	test('cv page check', async ({ page }) => {
		await page.goto('/cv');
		const header = page.locator('header#top');
		await expect(header).toBeVisible();
		const nav = header.locator('nav');
		await expect(nav).toBeVisible();
		await expect(page.locator('footer')).toBeVisible()
	});

	test('portfolio page check', async ({ page }) => {
		await page.goto('/portfolio');
		const header = page.locator('header#top');
		await expect(header).toBeVisible();
		const nav = header.locator('nav');
		await expect(nav).toBeVisible();
		await expect(page.locator('footer')).toBeVisible()
	});

	test('404 page check', async ({ page }) => {
		await page.goto('/404');
		const header = page.locator('header#top');
		await expect(header).toBeVisible();
		const nav = header.locator('nav');
		await expect(nav).toBeVisible();
		await expect(page.locator('footer')).toBeVisible()
	});
});