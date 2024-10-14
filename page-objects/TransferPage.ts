import { expect, Page, Locator } from '@playwright/test';
import { AbstractPage } from './Abstractpage';

export class TransferPage extends AbstractPage {
    readonly fromAccountOption: Locator;
    readonly toAccountOption: Locator;
    readonly amountInput: Locator;
    readonly descriptionInput: Locator;
    readonly submitButton: Locator;
    readonly preTransferMessage: Locator;
    readonly postTransferMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.fromAccountOption = page.locator('#tf_fromAccountId');
        this.toAccountOption = page.locator('#tf_toAccountId');
        this.amountInput = page.locator('#tf_amount');
        this.descriptionInput = page.locator('#tf_description');
        this.submitButton = page.locator('#btn_submit');
        this.preTransferMessage = page.locator('h2.board-header');
        this.postTransferMessage = page.locator('.alert-success');
    };

    async transferMoney(from: string, to: string, amount: string, description: string){
        await this.fromAccountOption.selectOption(from);
        await this.toAccountOption.selectOption(to);
        await this.amountInput.fill(amount);
        await this.descriptionInput.fill(description);
        await this.submitButton.click();

        await expect(this.preTransferMessage).toBeVisible();
        await expect(this.preTransferMessage).toHaveText('Transfer Money & Make Payments - Verify');
        await this.submitButton.click();
    };

    async asserrtMessage() {
        await expect(this.postTransferMessage).toBeVisible();
        await expect(this.postTransferMessage).toContainText('You successfully submitted your transaction.');
    };
}