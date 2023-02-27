exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    
    // left navigation
    this.brunoSelector = page.getByRole('complementary').getByText('bruno');
    this.brunoImageSelector = page.getByRole('complementary').locator('#color path');
    this.ellipsesMenuSelector = page.getByRole('complementary').locator('svg').nth(1);
    this.ellipsesCreateCollectionSelector = page.getByRole('tooltip', { name: 'Create Collection Open Collection Import Collection' }).getByText('Create Collection');
    this.ellipsesOpenCollectionSelector = page.getByRole('tooltip', { name: 'Create Collection Open Collection Import Collection' }).getByText('Open Collection');
    this.ellipsesImportCollectionSelector = page.getByRole('tooltip', { name: 'Create Collection Open Collection Import Collection' }).getByText('Import Collection');
    this.chevronSelector = page.getByRole('complementary').locator('svg').nth(3);
    this.supportSelector = page.locator('');
    this.supportPopupTitle = page.locator('');
    this.supportPopupReportIssuesSelector = page.locator('');
    this.supportPopupDiscordSelector = page.locator('');
    this.supportPopupGithubSelector = page.locator('');
    this.supportPopupTwitterSelector = page.locator('');
    this.themeSelector = page.locator('');
    this.themePopupTitle = page.locator('');
    this.themePopupLightModeSelector = page.locator('');
    this.themePopupDarkModeSelector = page.locator('');
    this.socialCountSelector = page.locator('');
    this.versionSelector = page.locator('');

    // main navigation
    this.createCollectionSelector = page.locator('#create-collection');
    this.openCollectionSelector = page.getByText('Open Collection', { exact: true });
    this.importCollectionSelector = page.locator('#import-collection');

    // sample collection
    // this.sampeCollectionSelector = page.locator('#sidebar-collection-name');
    // this.getUsersSelector = page.getByText('Users');
    // this.getSingleUserSelector = page.getByText('Single User');
    // this.getUserNotFoundSelector = page.getByText('User Not Found');
    // this.postCreateSelector = page.getByText('Create');
    // this.putUpdateSelector = page.getByText('Update');

    // request panel
    // this.sendRequestButton = page.locator('#send-request');
    // this.statusRequestSuccess = page.getByText('200 OK');
    // this.statusRequestNotFound = page.getByText('404 Not Found');
    // this.statusRequestCreated = page.getByText('201 Created');
    
    // create collection
    this.collectionNameInput = page.locator('input[name="collectionName"]');
    this.collectionFolderNameInput = page.locator('input[name="collectionFolderName"]');
    // this.submitButton = page.locator(`button[type='submit']`);
    // this.createNewCollectionSuccessToast = page.getByText('Collection created');
    // this.createNewTab = page.locator('#create-new-tab');
    // this.requestNameField = page.locator('input[name="requestName"]');
    // this.methodName = page.locator('#create-new-request-method').first();
    // this.requestUrlField = page.locator('#request-url');
    // this.networkErrorToast = page.getByText('Network Error');
  }

  async open() {
    await this.page.goto('/');
  }

  async assertLocatorHyperlink(locator, hyperlink) {
    // const locatorHref = await this.page.$eval(locator, (el) => el.getAttribute('href'));
    const locatorHref = await locator.getAttribute('href');
    await expect(locatorHref).to.equal(hyperlink);
  }

  // async getUsers() {
  //   await this.sampeCollectionSelector.click();
  //   await this.getUsersSelector.click();
  //   await this.sendRequestButton.click();
  // }

  // async getSingleUser() {
  //   await this.getSingleUserSelector.click();
  //   await this.sendRequestButton.click();
  // }

  // async getUserNotFound() {
  //   await this.getUserNotFoundSelector.click();
  //   await this.sendRequestButton.click();
  // }

  // async createUser() {
  //   await this.postCreateSelector.click();
  //   await this.sendRequestButton.click();
  // }

  // async updateUser() {
  //   await this.putUpdateSelector.click();
  //   await this.sendRequestButton.click();
  // }

  async createNewCollection(collectionName, folderName) {
    await this.createCollectionSelector.click();
    await this.collectionNameInput.fill(collectionName);
    await this.collectionFolderNameInput.fill(folderName);
    // await this.submitButton.click();


    // {
    //   "function": "_collectionTreeUpdated",
    //   "args": {
    //     "type": "addDir",
    //     "val": {
    //       "meta": {
    //         "collectionUid":"1i9k0zf00000000000000",
    //         "pathname": "/Users/dc/git/dcoomber/exploring-bruno/exploration/01-import/abc",
    //         "name":"abc"
    //       }
    //     }
    //   }
    // }
  }

  async createNewRequest(name, method, endpoint) {
    await this.createNewTab.click();
    await this.requestNameField.fill(name);
    await this.methodName.click();
    await this.page.click(`text=${method}`);
    await this.requestUrlField.fill(endpoint);
    await this.submitButton.click();
    await this.sendRequestButton.click();
  }
}
