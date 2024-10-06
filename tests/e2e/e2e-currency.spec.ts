import { test, expect } from '@playwright/test';

test.describe('currency exchange', () => {
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

    test('should show currency', async ({page}) => {
        await page.click('text=Purchase Foreign Currency')

        await page.selectOption('.controls > #pc_currency', 'Eurozone (euro)');
        await page.waitForSelector('#sp_sell_rate');
        await page.fill('#pc_amount', '500');
        await page.locator('#pc_inDollars_true').check();
        await page.click('#pc_calculate_costs');
        await page.waitForSelector('#pc_conversion_amount');
        await page.click('#purchase_cash');

        const mes = await page.locator('#alert_container > div');
        await expect(mes).toBeVisible();
        await expect(mes).toHaveText('Foreign currency cash was successfully purchased.');

    })
});