import { test } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage";
import { FeedbackPage } from "../../page-objects/FeedbackPage";

test.describe("Feedback form", () => {
    let homePage: HomePage;
    let feedbackPage: FeedbackPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        feedbackPage = new FeedbackPage(page);

        await homePage.visit();
        await homePage.clickOnFeedbackLink();
    });

    //reset a feedback form
    test('Reset feedback form', async ({ page }) => {
        await feedbackPage.fillForm('Some Name', 'test@example.com', 'some subject', 'some comment');
        await feedbackPage.resetForm();
        await feedbackPage.assertReset();
    })

    //submit feedback form
    test("Submit Feedback Form", async ({ page }) => {
        await feedbackPage.fillForm('Some Name', 'test@example.com', 'some subject', 'some comment');
        await feedbackPage.submitForm();
        await feedbackPage.feedbackFormSent();
    })
})