import { test, expect } from "@playwright/test";
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
import { Navbar } from '../../page-objects/components/Navbar';
import { TransferPage } from "../../page-objects/TransferPage";

test.describe("Transfer Funds and make payments", () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let navbar: Navbar;
    let transferPage: TransferPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        navbar = new Navbar(page);
        transferPage = new TransferPage(page);

        await homePage.visit();
        await homePage.clickOnSignInButton();
        await loginPage.login("username", 'password');
        await homePage.visit();
        await page.click('#online-banking');
    });

    test('Transfer funds', async ({ page }) => {
        await navbar.clickOnTab('Transfer Funds');
        await transferPage.transferMoney('3', '4', '500', "description");
        await transferPage.asserrtMessage();
    });
});