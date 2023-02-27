const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/home.page');

test.describe('bruno acceptance test', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {  
    homePage = new HomePage(page);

    await homePage.open();
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(/bruno/);
  });

  test('home page navigation and links', async () => {
    // left pane navigation and links
    await expect(homePage.brunoSelector).toBeVisible();
    await expect(homePage.brunoImageSelector).toBeVisible();
    await expect(homePage.ellipsesMenuSelector).toBeVisible();
    await homePage.ellipsesMenuSelector.click();
    await expect(homePage.ellipsesCreateCollectionSelector).toBeVisible();
    await expect(homePage.ellipsesOpenCollectionSelector).toBeVisible();
    await expect(homePage.ellipsesImportCollectionSelector).toBeVisible();
    await expect(homePage.chevronSelector).toBeVisible();
    await homePage.chevronSelector.click();




    await homePage.assertLocatorHyperlink(homePage.socialCountSelector, '/');


    // main pane navigation and links
    await expect(homePage.createCollectionSelector).toBeVisible();
    await expect(homePage.openCollectionSelector).toBeVisible();
    await expect(homePage.importCollectionSelector).toBeVisible();


  });

});
