import { test, expect } from '@playwright/test';

import { loadHomepage, assertTitle } from '../helper';

test('Simple basic test', async ({ page }) => {
    await page.goto('https://example.com/');
    const pageTitle = await page.locator('h1');
    await expect(pageTitle).toContainText('Example Domain');
});

test('Clicking on an element', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/');

    await page.click('#signin_button');
    await page.click('text=Sign in');

    const errorMessage = await page.locator('.alert-error');
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
});


test.skip('Selectors', async ({ page }) => {
    //text
    await page.click('text=some text');

    //css selector
    await page.click('button');
    await page.click('#id');
    await page.click('.class');

    //only visible css selector 
    await page.click('submit-button:visible');

    //combination
    await page.click('#username .first')

    //XPath
    await page.click('//button')
})


test.describe("My first test suite", () => {
    test('Working with inputs', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('#signin_button');

        await page.fill("#user_login", "some username");
        await page.type("#user_password", "some password");
        await page.click('text=Sign in');

        const errorMessage = await page.locator('.alert-error');
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    });

    test("Assertion @myTag", async ({ page }) => {
        await page.goto('https://example.com/');
        await expect(page).toHaveURL('https://example.com/');

        await expect(page).toHaveTitle('Example Domain');

        const element = await page.locator('h1');
        await expect(element).toBeVisible();
        await expect(element).toHaveText('Example Domain');
        await expect(element).toHaveCount(1);

        const notExistingElement = await page.locator('h5');
        await expect(notExistingElement).not.toBeVisible();
    })
})


test.describe.parallel.only('Hooks', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://example.com');
    })

    test("Screenshot", async ({ page }) => {
        //load website
        //take a screenshot of full page
        await page.screenshot({ path: 'screenshot.png', fullPage: true });
    })

    test('Single element screenshot', async ({ page }) => {
        const element = await page.$('h1');
        await element?.screenshot({ path: 'single_element_screenshot.png' });
    })
})

test('Custom helpers', async ({ page }) => {
    await loadHomepage(page);
    //await page.pause();
    await assertTitle(page);
})