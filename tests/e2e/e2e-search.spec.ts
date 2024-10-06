import { test, expect } from '@playwright/test';

test.describe('Search results', () => {
    test('Sould find search results', async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html");

        await page.fill('#searchTerm', 'bank');
        await page.keyboard.press("Enter");

        await page.waitForSelector('li > a');
        const numberofLinks = await page.locator('li > a');
        await expect(numberofLinks).toHaveCount(2);
    });
});