import { BasePage } from "./BasePage";

export class ProductTariffPage extends BasePage {
  
  private orderNowButton = "#product3-order-button";

  async orderProduct() {
    await this.click(this.orderNowButton);
  }
}
