import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class ReviewPage extends BasePage {
  private itemTitleLocator = "span.item-title";
  private subtotalLocator = "#subtotal";
  private checkoutButton = "#checkout";

  async waitForItemTitle(expectedTitle: string) {
    const itemTitle = this.page.locator(this.itemTitleLocator).first();
    await itemTitle.waitFor({ state: "visible" });
    const actualTitle = (await itemTitle.innerText()).split("Edit")[0].trim();
    expect(actualTitle).toBe(expectedTitle);
  }

  async waitForSubtotalUpdate(minSubtotal: number, maxSubtotal: number) {
    const subtotalLocator = this.page.locator(this.subtotalLocator);
    await subtotalLocator.waitFor({ state: "visible" });
    const subtotalText = await subtotalLocator.textContent();
    if (!subtotalText) {
      throw new Error("Subtotal element not found or has no text!");
    }
    const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ""));
    expect(subtotal).toBeGreaterThanOrEqual(minSubtotal);
    expect(subtotal).toBeLessThanOrEqual(maxSubtotal);
    expect(subtotalText.trim()).toContain("USD");
  }

  async checkout() {
    await this.click(this.checkoutButton);
  }
}
