const HomePage = require("../pageobjects/home.page");
const { expect } = require("chai");

describe("Homepage Tests", () => {
  beforeEach(async () => {
    await HomePage.open();
  });

  it("should display the header", async () => {
    const header = await HomePage.header;
    expect(await header.isDisplayed()).to.be.true;
  });

  it("should show the dropdown menu when clicking the categories link", async () => {
    await HomePage.categoriesLink.click();
    expect(await HomePage.dropDownMenu.isDisplayed()).to.be.true;
  });

  it("should display the sign-in link", async () => {
    expect(await HomePage.signIn.isDisplayed()).to.be.true;
  });

  it("should navigate to login page when clicking the sign-in link", async () => {
    await HomePage.signIn.click();
    await browser.waitUntil(async () =>
      (await browser.getUrl()).includes("/auth/login")
    );
    expect(await browser.getUrl()).to.include("/auth/login");
  });

  it("should display the language button", async () => {
    expect(await HomePage.languageButton.isDisplayed()).to.be.true;
  });

  it("should switch to DE language", async () => {
    await HomePage.clicklanguageButton();
    await HomePage.clicklanguageDe();
    expect(await HomePage.languageButton.getText()).to.equal("DE");
  });
});
