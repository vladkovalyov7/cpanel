import { BasePage } from "./BasePage";
import { Config } from "../utils/Config";
import { expect } from "@playwright/test";

export class ConfigurePage extends BasePage {

  config = Config.getInstance();
  private ipInput = "input[name='customfield[11]']";
  private continueButton = "//button[normalize-space()='Continue']";
  private addonButton = "div.icheckbox_square-blue";
  private priceLocator = "//span[contains(text(), '+ Monthly CloudLinux')]/following-sibling::span[contains(@class, 'pull-right')]";

  async enterIp(ip: string) {
    await this.type(this.ipInput, ip);
  }

  async chooseAddon() {
    const button = this.page.locator(this.addonButton).first();
    await button.click();
  }

  async waitForPriceUpdate(minPrice: number, maxPrice: number) {
    const priceText = await this.page.locator(this.priceLocator).textContent();
    if (!priceText) {
      throw new Error("Price element not found or has no text!");
    }
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
    expect(price).toBeGreaterThanOrEqual(minPrice);
    expect(price).toBeLessThanOrEqual(maxPrice);
    expect(priceText.trim()).toContain("USD");
  }

  async continue() {
    const button = this.page.locator(this.continueButton);
    await this.enterIp(this.config.testIp);
    await button.dblclick({ force: true });
    await this.page.waitForFunction(
      (el) => el && !el.hasAttribute("disabled"),
      await button.elementHandle(),
    );
    await button.click();
  }
}
