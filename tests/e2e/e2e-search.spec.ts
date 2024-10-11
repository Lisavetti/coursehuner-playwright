import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Search results', () => {
    test('Sould find search results', async ({ page }) => {
        let homePage: HomePage = new HomePage(page);

        await homePage.visit();

        await homePage.searchFor('bank');

        await page.waitForSelector('li > a');
        const numberofLinks = await page.locator('li > a');
        await expect(numberofLinks).toHaveCount(2);
    });
});