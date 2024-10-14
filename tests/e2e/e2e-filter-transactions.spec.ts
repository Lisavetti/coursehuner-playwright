import { expect, test} from "@playwright/test";
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe("Filter transactions", () => {
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

    test('Verify the results for each account', async ({page}) => {
        await page.click('#account_activity_link');
        await page.selectOption('#aa_accountId', '2');
        const checkingAccount = await page.locator('#all_transactions_for_account tbody tr');
        await expect(checkingAccount).toHaveCount(3);

        await page.selectOption('#aa_accountId', '4');
        const loadAccount = await page.locator('#all_transactions_for_account tbody tr');
        await expect(loadAccount).toHaveCount(2);

        await page.selectOption('#aa_accountId', '6');
        const brokeage = await page.locator('.well');
        await expect(brokeage).toBeVisible();
    })
});