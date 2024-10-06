import { test, expect } from "@playwright/test";

test.describe("Transfer Funds and make payments", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html');
        await page.click('#signin_button');

        await page.fill('#user_login', 'username');
        await page.fill('#user_password', 'password');

        await page.click('text=Sign in');

        await page.goto('http://zero.webappsecurity.com/index.html');

        await page.click('#transfer_funds_link');
    });

    test('Transfer funds', async ({page}) => {
        await page.selectOption('#tf_fromAccountId', '2');
        await page.selectOption('#tf_toAccountId', '3');
        await page.fill('#tf_amount', '500');
        await page.fill('#tf_description', 'Description');
        await page.click('#btn_submit');

        const wordHeader = await page.locator('h2.board-header');
        await expect(wordHeader).toContainText('Transfer Money & Make Payments - Verify');

        await page.click('#btn_submit');

        const alertSuccess = await page.locator('.alert-success');
        await expect(alertSuccess).toContainText('You successfully submitted your transaction.');

    });
});