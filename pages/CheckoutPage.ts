import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class CheckoutPage extends BasePage {
  private subTotalLocator = "#checkoutSummaryValues #cartSubtotal";
  private totalDueTodayLocator =
    "//div[contains(text(), 'Total Due Today')]/following-sibling::div[contains(@id, 'totalCartPrice')]";
  private personalInfoLocator =
    "//span[@class='primary-bg-color' and text()='Personal Information']";
  private billingAddressLocator =
    "//span[@class='primary-bg-color' and text()='Billing Address']";
  private accountSecurityLocator =
    "//span[@class='primary-bg-color' and text()='Account Security']";
  private termsConditionsLocator =
    "//span[@class='primary-bg-color' and text()='Terms & Conditions']";
  private paymentDetailsLocator =
    "//span[@class='primary-bg-color' and text()='Payment Details']";
  private completeOrderButton =
    "//button[@id='btnCompleteOrder' and contains(text(), 'Complete Order')]";

  async waitForProductNameUpdate(expectedName: string) {
    const locator = this.page.getByRole("cell", { name: expectedName }).first();
    await expect(locator).toHaveText(expectedName);
  }

  async waitForIpUpdate(expectedIp: string) {
    const locator = this.page.getByRole("cell", { name: expectedIp }).first();
    await locator.waitFor({ state: "visible" });
    const actualText = (await locator.innerText()).trim();
    expect(actualText).toContain(expectedIp);
  }

  async waitForPersonalInfoUpdate(expectedPersonalInfo: string) {
    await this.waitForTextUpdate(
      this.personalInfoLocator,
      expectedPersonalInfo,
    );
  }

  async waitForBillingAddressUpdate(expectedBillingAddress: string) {
    await this.waitForTextUpdate(
      this.billingAddressLocator,
      expectedBillingAddress,
    );
  }

  async waitForAccountSecurityUpdate(expectedAccountSecurity: string) {
    await this.waitForTextUpdate(
      this.accountSecurityLocator,
      expectedAccountSecurity,
    );
  }

  async waitForTermsConditionsUpdate(expectedTermsConditions: string) {
    await this.waitForTextUpdate(
      this.termsConditionsLocator,
      expectedTermsConditions,
    );
  }

  async waitForPaymentDetailsUpdate(expectedPaymentDetails: string) {
    await this.waitForTextUpdate(
      this.paymentDetailsLocator,
      expectedPaymentDetails,
    );
  }

  async waitForSubtotalUpdate(minPrice: number, maxPrice: number) {
    const locator = this.page.locator(this.subTotalLocator);
    await locator.waitFor({ state: "visible" });
    const subtotal = (await locator.innerText()).trim();
    const price = parseFloat(subtotal.replace(/[^0-9.]/g, ""));
    expect(price).toBeGreaterThanOrEqual(minPrice);
    expect(price).toBeLessThanOrEqual(maxPrice);
    expect(subtotal).toContain("USD");
  }

  async waitForTotalDueTodayUpdate(minTotal: number, maxTotal: number) {
    await this.waitForPriceRange(this.totalDueTodayLocator, minTotal, maxTotal);
  }

  async waitForCompleteOrderUpdate(expectedButton: string) {
    const button = this.page.locator(this.completeOrderButton);
    await button.waitFor({ state: "visible" });
    await expect(button).toHaveText(expectedButton);
    await expect(button).toBeDisabled();
  }

  async waitForTextUpdate(
    selector: string,
    expectedText: string,
    useXPath = false,
  ) {
    let locator = this.page.locator(selector);
    if ((await locator.count()) > 1) {
      locator = locator.first();
    }
    await locator.waitFor({ state: "visible" });
    const actualText = (await locator.innerText()).trim();
    expect(actualText).toBe(expectedText);
  }

  async waitForPriceRange(selector: string, min: number, max: number) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: "visible" });
    const priceText = (await locator.innerText()).trim();
    if (!priceText.includes("USD")) {
      throw new Error(`Expected currency "USD" not found in "${priceText}"`);
    }
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
    expect(price).toBeGreaterThanOrEqual(min);
    expect(price).toBeLessThanOrEqual(max);
  }
}
