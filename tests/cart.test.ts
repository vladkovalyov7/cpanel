import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductTariffPage } from "../pages/ProductTariffPage";
import { ConfigurePage } from "../pages/ConfigurePage";
import { ReviewPage } from "../pages/ReviewPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { Config } from "../utils/Config";

test.describe("cPanel Store - Add Product and Addon to Cart", () => {
  const PRODUCT_NAME = "cPanel Solo® Cloud (1 Account)";
  const EXPECTED_PRICE_RANGE = { min: 20, max: 30 };
  const PERSONAL_INFO = "Personal Information";
  const BILLING_ADDRESS = "Billing Address";
  const ACCOUNT_SECURITY = "Account Security";
  const TERMS_CONDITIONS = "Terms & Conditions";
  const PAYMENT_DETAILS = "Payment Details";
  const COMPLETE_ORDER = "Complete Order";

  test("Verify product and addon addition to cart", async ({ page }) => {
    const config = Config.getInstance();
    const homePage = new HomePage(page);
    const productTariffPage = new ProductTariffPage(page);
    const configurePage = new ConfigurePage(page);
    const reviewPage = new ReviewPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.navigate(config.baseUrl);
    await homePage.selectCPanelLicenses();

    await productTariffPage.orderProduct();

    await configurePage.enterIp(config.testIp);
    await configurePage.chooseAddon();
    configurePage.waitForPriceUpdate(
      EXPECTED_PRICE_RANGE.min,
      EXPECTED_PRICE_RANGE.max,
    );
    await configurePage.continue();

    await reviewPage.waitForItemTitle(PRODUCT_NAME);
    await reviewPage.waitForSubtotalUpdate(
      EXPECTED_PRICE_RANGE.min,
      EXPECTED_PRICE_RANGE.max,
    );
    await reviewPage.checkout();

    await checkoutPage.waitForProductNameUpdate(PRODUCT_NAME);
    await checkoutPage.waitForIpUpdate(config.testIp);
    await checkoutPage.waitForSubtotalUpdate(
      EXPECTED_PRICE_RANGE.min,
      EXPECTED_PRICE_RANGE.max,
    );
    await checkoutPage.waitForTotalDueTodayUpdate(
      EXPECTED_PRICE_RANGE.min,
      EXPECTED_PRICE_RANGE.max,
    );
    await checkoutPage.waitForPersonalInfoUpdate(PERSONAL_INFO);
    await checkoutPage.waitForBillingAddressUpdate(BILLING_ADDRESS);
    await checkoutPage.waitForAccountSecurityUpdate(ACCOUNT_SECURITY);
    await checkoutPage.waitForTermsConditionsUpdate(TERMS_CONDITIONS);
    await checkoutPage.waitForPaymentDetailsUpdate(PAYMENT_DETAILS);
    await checkoutPage.waitForCompleteOrderUpdate(COMPLETE_ORDER);
  });
});
