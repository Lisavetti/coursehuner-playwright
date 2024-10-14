import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe('currency exchange', () => {
    let homePage : HomePage;
    let loginPage : LoginPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.visit();
        await homePage.clickOnSignInButton();
        await loginPage.login("username", 'password');

        await homePage.visit();
        await page.click('#online-banking');
    });

    test('should show currency', async ({page}) => {
        await page.click('#pay_bills_link');
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