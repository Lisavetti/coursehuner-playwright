import { expect, Locator, Page } from '@playwright/test';
import { AbstractPage } from './Abstractpage';

export class LoginPage extends AbstractPage {
    //Define Selectors
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    //Init Selectors using constructor
    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator("#user_login");
        this.passwordInput = page.locator("#user_password");
        this.submitButton = page.locator("text=Sign in");
        this.errorMessage = page.locator('.alert-error');
    }

    //Define login page methods
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toHaveText('Login and/or password are wrong.');
    }
}