import { expect, test } from '@playwright/test';

test.describe('wrapped by main', () => {
	test('home page check', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('main')).toBeVisible();
	});

	test('cv page check', async ({ page }) => {
		await page.goto('/cv');
		await expect(page.locator('main')).toBeVisible();
	});

	test('portfolio page check', async ({ page }) => {
		await page.goto('/portfolio');
		await expect(page.locator('main')).toBeVisible();
	});

	test('contact page check', async ({ page }) => {
		await page.goto('/contact');
		await expect(page.locator('main')).toBeVisible();
	});
});
