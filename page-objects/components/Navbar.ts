import { expect, Locator, Page } from "@playwright/test";

export class Navbar {
    readonly page: Page;
    readonly accontSummary: Locator;
    readonly accountActivity: Locator;
    readonly transefFunds: Locator;
    readonly payBills: Locator;
    readonly myMoneyMap: Locator;
    readonly onlineStatements: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accontSummary = page.locator('#account_summary_link');
        this.accountActivity = page.locator('#account_activity_link');
        this.transefFunds = page.locator('#transfer_funds_link');
        this.payBills = page.locator('#pay_bills_link');
        this.myMoneyMap = page.locator('#money_map_link');
        this.onlineStatements = page.locator('#online_statements_link');
    };

    async clickOnTab(tabname) {
        switch (tabname) {
            case "Account Summary":
                await this.accontSummary.click();
                break;
            case "Account Activity":
                await this.accountActivity.click();
                break;
            case "Transfer Funds":
                await this.transefFunds.click();
                break;
            case "Pay Bills":
                await this.payBills.click();
                break;
            case "My Money Map":
                await this.myMoneyMap.click();
                break;
            case "Online Statements":
                await this.onlineStatements.click();
                break;
            default:
                throw new Error("This tab doens't exist");
        }
    }

}