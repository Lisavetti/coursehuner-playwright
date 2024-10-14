import { expect, Locator, Page } from '@playwright/test';
import { AbstractPage } from './Abstractpage';

export class HomePage extends AbstractPage {
    readonly signInButton: Locator;
    readonly searchBar: Locator;
    readonly feedbackLink: Locator;

    constructor(page: Page) {
        super(page);
        this.signInButton = page.locator('#signin_button');
        this.searchBar = page.locator('#searchTerm');
        this.feedbackLink = page.locator('#feedback');
    }

    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/');
    }

    async clickOnSignInButton() {
        await this.signInButton.click();
    }

    async clickOnFeedbackLink() {
        await this.feedbackLink.click();
    }

    async searchFor(phrase: string) {
        await this.searchBar.fill(phrase);
        await this.page.keyboard.press("Enter");
    }
}