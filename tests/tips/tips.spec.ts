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
        test(`Running test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/');
            await page.fill('#searchTerm', `${name}`);
            // await page.waitForTimeout(3000);
        });
    };

    test('Mouse movement simulation', async ({ page }) => {
        await page.goto('https://example.com');
        await page.mouse.move(0,0);
        await page.mouse.down();
        await page.mouse.move(0,100);
        await page.mouse.up();
    });

    test('Multiple browser tabs inside 1 browser', async ({ browser }) => {
        const context = await browser.newContext();
        const page1 = await context.newPage();
        const page2 = await context.newPage();
        const page3 = await context.newPage();
        await page1.goto('http://example.com');
        await page2.goto('http://example.com');
        await page3.goto('http://example.com');
        // await page1.waitForTimeout(5000);
    })

        //"tests:device": "npx playwright open --device='iPhone 15 Pro Max' wikipedia.org"
        //"tests:retries": "npx playwright test --config=playwright.config.ts --project=Chromium --retries=3"
        //"tests:savepdf": "npx playwright pdf https://playwright.dev/docs/input myfile.pdf"
        //"tests:customize-screenshot": "npx playwright screenshot --device="iPhone 15 Pro Max" --color-scheme=dark --wait-for-timeout=3000 twitter.com twitter-iphone-image.png"
        //"tests:location": "npx playwright open --timezone="Europe/Kyiv" --lang="ukr-UKR" google.com"


})