import { test, expect } from '@playwright/test';

test.describe.only('visual regression testing example', () => {
    test('full page snapshot', async ({ page }) => {
        await page.goto('https://www.example.com');
        expect(await page.screenshot()).toMatchSnapshot('homepage.png');
    });

    test('single element snapshot', async ({ page }) => {
        await page.goto('https://www.example.com');
        const h1selector = await page.$('h1');
        expect(await h1selector?.screenshot()).toMatchSnapshot('pageTitile.png');
    });
});