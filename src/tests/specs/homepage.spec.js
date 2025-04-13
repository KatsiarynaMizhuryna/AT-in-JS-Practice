import homePage from "../../business/pages/home.page.js";
import { expect } from "chai";

describe("Homepage Tests", () => {
  beforeEach(async () => {
    await homePage.open();
  });

  it("should display the header", async () => {
    const header = await homePage.header;
    expect(await header.isDisplayed()).to.be.true;
  });

  it("should show the dropdown menu when clicking the categories link", async () => {
    await homePage.categoriesLink.click();
    expect(await homePage.dropDownMenu.isDisplayed()).to.be.true;
  });

  it("should display the sign-in link", async () => {
    expect(await homePage.signIn.isDisplayed()).to.be.true;
  });

  it("should navigate to login page when clicking the sign-in link", async () => {
    await homePage.signIn.click();
    await browser.waitUntil(async () =>
      (await browser.getUrl()).includes("/auth/login")
    );
    expect(await browser.getUrl()).to.include("/auth/login");
  });

  it("should display the language button", async () => {
    expect(await homePage.languageButton.isDisplayed()).to.be.true;
  });

  it("should switch to DE language", async () => {
    await homePage.clicklanguageButton();
    await homePage.clicklanguageDe();
    expect(await homePage.languageButton.getText()).to.equal("DE");
  });
});
