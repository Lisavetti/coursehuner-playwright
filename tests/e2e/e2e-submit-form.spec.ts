import { test, expect } from "@playwright/test"

test.describe("Feedback form", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html');
        await page.click('#feedback');
    });

    //reset a feedback form
    test('Reset feedback form', async ({page}) => {
        await page.fill("#name", "Some Name");
        await page.fill("#email", "test@example.com");
        await page.fill("#subject", "Some subject");
        await page.fill("#comment", "Some comment");
        await page.click('input[name="clear"]');

        const nameInput = await page.locator("#name");
        const commentInput = await page.locator("#comment");

        await expect(nameInput).toBeEmpty();
        await expect(commentInput).toBeEmpty();
    })

    //submit feedback form
    test("Submit Feedback Form", async ({page}) => {
        await page.fill("#name", "Some Name");
        await page.fill("#email", "test@example.com");
        await page.fill("#subject", "Some subject");
        await page.fill("#comment", "Some comment");

        await page.click('input[name="submit"]');

        await page.waitForSelector('#feedback-title');
    })
})