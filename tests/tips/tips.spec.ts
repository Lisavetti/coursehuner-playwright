import { test, expect } from '@playwright/test';

test.describe.only('Tips and tricks section', () => {
    test('test info object', async ({ page }, testInfo) => {
        await page.goto('https://example.com');
        console.log(testInfo.title);
    });

    test('test skip browser', async ({ page, browserName }) => {
        test.skip(browserName === 'chromium', 'feature not ready for Chrome');
        await page.goto('https://example.com');
    });

    test('test fixme annotation', async ({ page, browserName }) => {
        test.fixme(browserName === 'chromium', 'test is not stable, needs for revision');
        await page.goto('https://example.com');
    });

    const people = ['John', 'Jake', 'Ilon', 'Julia', 'Liza'];
    for (const name of people) {
        test.only(`Running test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/');
            await page.fill('#searchTerm', `${name}`);
            // await page.waitForTimeout(3000);
        });
    };
})