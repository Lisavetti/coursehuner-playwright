import { test } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
import { PaymentPage } from '../../page-objects/PaymentPage';
import { Navbar } from '../../page-objects/components/Navbar';

test.describe("new payment", () => {
    let paymentPage: PaymentPage;
    let homePage: HomePage;
    let loginPage: LoginPage;
    let navbar: Navbar;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        paymentPage = new PaymentPage(page);
        navbar = new Navbar(page);

        await homePage.visit();
        await homePage.clickOnSignInButton();
        await loginPage.login("username", 'password');
        await homePage.visit();
        await page.click('#online-banking');
    });

    test('should send new payment', async ({ page }) => {
        navbar.clickOnTab("Pay Bills");
        await paymentPage.createPayee();
        await paymentPage.assertSuccessMessage();
    })
});