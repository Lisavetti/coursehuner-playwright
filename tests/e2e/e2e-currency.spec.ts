import { test } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
import { Navbar } from '../../page-objects/components/Navbar';
import { CurrencyPage } from '../../page-objects/CurrencyPage';

test.describe('currency exchange', () => {
    let homePage : HomePage;
    let loginPage : LoginPage;
    let navbar : Navbar;
    let currencyPage : CurrencyPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        navbar = new Navbar(page);
        currencyPage = new CurrencyPage(page);

        await homePage.visit();
        await homePage.clickOnSignInButton();
        await loginPage.login("username", 'password');
        await homePage.visit();
        await page.click('#online-banking');
    });

    test('should show currency', async ({page}) => {
        await navbar.clickOnTab("Pay Bills")
        await currencyPage.createCurrencyExchange("EUR", '500');
        await currencyPage.assertSuccessMessage();
    });
});