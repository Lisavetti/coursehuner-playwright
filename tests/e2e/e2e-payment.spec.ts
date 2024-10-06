import { test, expect } from '@playwright/test';

test.describe("new payment", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html');
        await page.click('#signin_button');

        await page.fill('#user_login', 'username');
        await page.fill('#user_password', 'password');

        await page.click('text=Sign in');

        await page.goto('http://zero.webappsecurity.com/index.html');

        await page.click('#online-banking');

        await page.click('#pay_bills_link');
    });

    test('should send new payment', async ({page}) => {
        await page.selectOption('#sp_payee', 'Apple');
        await page.click('#sp_get_payee_details');
        await page.waitForSelector('#sp_payee_details');
        await page.selectOption('#sp_account', '6');
        await page.fill('#sp_amount', '5000');
        await page.fill('#sp_date', '2024-10-06');
        await page.fill('#sp_description', 'descriptions');
        await page.click('#pay_saved_payees');

        const message = await page.locator('#alert_content > span');
        await expect(message).toBeVisible();
        await expect(message).toHaveText('The payment was successfully submitted.');

    })
});