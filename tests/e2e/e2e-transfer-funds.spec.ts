import { test, expect } from "@playwright/test";
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe("Transfer Funds and make payments", () => {
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

    test('Transfer funds', async ({ page }) => {
        await page.click('#transfer_funds_link');
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