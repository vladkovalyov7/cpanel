import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  private cPanelLicensesButton =
    "//h3[contains(@class, 'card-title') and contains(text(), 'cPanel Licenses')]/following-sibling::a[contains(@class, 'btn-outline-primary') and contains(text(), 'Browse Products')]";

  async selectCPanelLicenses() {
    await this.click(this.cPanelLicensesButton);
  }
}
