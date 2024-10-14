import { expect, Locator, Page } from '@playwright/test';
import { AbstractPage } from './Abstractpage';

export class PaymentPage extends AbstractPage{
    readonly payeeSelectBox: Locator;
    readonly payeeDetailsButton: Locator;
    readonly payeeDetail: Locator;
    readonly accountSelectBox: Locator;
    readonly amountInput: Locator;
    readonly dateInput: Locator;
    readonly descriptionInput: Locator;
    readonly submitPaymentButton: Locator;
    readonly message : Locator;

    constructor(page: Page) {
        super(page);
        this.payeeSelectBox = page.locator('#sp_payee');
        this.payeeDetailsButton = page.locator('#sp_get_payee_details');
        this.payeeDetail = page.locator('#sp_payee_details');
        this.accountSelectBox = page.locator('#sp_account');
        this.amountInput = page.locator('#sp_amount');
        this.dateInput = page.locator('#sp_date');
        this.descriptionInput = page.locator('#sp_description');
        this.submitPaymentButton = page.locator('#pay_saved_payees');
        this.message = page.locator('#alert_content > span');
    };

    async createPayee() {
        await this.payeeSelectBox.selectOption("Apple");
        await this.payeeDetailsButton.click();
        await expect(this.payeeDetail).toBeVisible();
        await this.accountSelectBox.selectOption("6");
        await this.amountInput.fill('500');
        await this.dateInput.fill('2024-10-06');
        await this.descriptionInput.fill('description');
        await this.submitPaymentButton.click();
    };

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible();
        await expect(this.message).toHaveText('The payment was successfully submitted.');
    }
}