import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe("new payment", () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.visit();
        await homePage.clickOnSignInButton();
        await loginPage.login("username", 'password');

        await homePage.visit();
        await page.click('#online-banking');
    });

    test('should send new payment', async ({ page }) => {
        await page.click('#pay_bills_link');
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