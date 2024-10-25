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
})