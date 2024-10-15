import { test } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe('LoginPage Visual Tests', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.visit();
        await homePage.clickOnSignInButton();
    });

    test('login form', async ({ page }) => { 
        await loginPage.shapshootLoginForm();
    });

    test('login error message', async ({ page }) => {
        await loginPage.login('invalid username', 'invalid password');
        await loginPage.shapshootErrorMessage();
    });
})