# Playwright Automation for cPanel Store

## Author: [Vladyslav Kovalov]

## Steps Covered

1. Navigate to store
2. Order a product
3. Enter IP address
4. Select addons
5. Verify order summary
6. Proceed to checkout
7. Verify checkout information

## Run Playwright Tests with Allure Reporting

npx playwright test --reporter=allure-playwright

## Generate & Open Allure Report

npx allure generate allure-results --clean && npx allure open
