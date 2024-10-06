import { test, expect } from "@playwright/test";

test.describe.parallel("Login/Logout flow", () => {
    //before hook
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
    });

    //negative scenario
    test("Negative scenario for login", async ({ page }) => {
        await page.click('#signin_button');
        await page.fill("#user_login", "invalid username");
        await page.fill("#user_password", "invalid password");
        await page.click("text=Sign in");
        const erroeMessage = await page.locator('.alert-error');

        await expect(erroeMessage).toContainText('Login and/or password are wrong.');
    })

    //positive scenario + logout
    test("Positive scenario for login with logout", async ({ page }) => {
        await page.click('#signin_button');
        await page.fill("#user_login", "username");
        await page.fill("#user_password", "password");
        await page.click("text=Sign in");

        const accountSummaryTab = await page.locator("#account_summary_tab");
        // await expect(accountSummaryTab).toBeVisible();

        await page.goto('http://zero.webappsecurity.com/logout.html');
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})