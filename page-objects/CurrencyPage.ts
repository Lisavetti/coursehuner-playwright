import { expect, Page, Locator } from '@playwright/test';
import { AbstractPage } from './Abstractpage';

export class CurrencyPage extends AbstractPage {
    readonly purchaseButton: Locator;
    readonly currencyOptions: Locator;
    readonly sellRateInfo: Locator;
    readonly ammountInput: Locator;
    readonly checkboxCurrency: Locator;
    readonly callculateButton: Locator;
    readonly conversionInfo: Locator;
    readonly submitButton: Locator;
    readonly message: Locator;

    constructor(page: Page) {
        super(page);
        this.purchaseButton = page.locator('text=Purchase Foreign Currency');
        this.currencyOptions = page.locator('.controls > #pc_currency');
        this.sellRateInfo = page.locator('#sp_sell_rate');
        this.ammountInput = page.locator('#pc_amount');
        this.checkboxCurrency = page.locator('#pc_inDollars_true');
        this.callculateButton = page.locator('#pc_calculate_costs');
        this.conversionInfo = page.locator('#pc_conversion_amount');
        this.submitButton = page.locator('#purchase_cash');
        this.message = page.locator('#alert_container > div');
    };

    async createCurrencyExchange(currency: string, amount: string){
        await this.purchaseButton.click();
        await this.currencyOptions.selectOption(currency);
        await expect(this.sellRateInfo).toBeVisible();
        await this.ammountInput.fill(amount);
        await this.checkboxCurrency.check();
        await this.callculateButton.click();
        await expect(this.conversionInfo).toBeVisible();
        await this.submitButton.click();
    };

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible();
        await expect(this.message).toHaveText('Foreign currency cash was successfully purchased.');
    };
}