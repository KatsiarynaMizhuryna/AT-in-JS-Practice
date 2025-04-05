<<<<<<< HEAD
const { Given, When, Then } = require("@wdio/cucumber-framework");
const HomePage = require("../pageobjects/home.page");
const LoginPage = require("../pageobjects/login.page");
=======
const { Given, When, Then } = require('@wdio/cucumber-framework');
const chai = require('chai');
const expect = chai.expect; 
const assert = chai.assert;
chai.should();
>>>>>>> af8484d (Chai integration)

Given("I am on the homepage", async function () {
  await HomePage.open();
});

<<<<<<< HEAD
Then("I should see the header", async function () {
  const header = await HomePage.header;
  await expect(header).toBeDisplayed();
=======
Then('I should see the header', async function () {
    const header = await HomePage.header;
    const isDisplayed = await header.isDisplayed();
    assert.isTrue(isDisplayed); 
>>>>>>> af8484d (Chai integration)
});

When("I click the categories link", async function () {
  const categoriesLink = await HomePage.categoriesLink;
  await categoriesLink.click();
});

Then("I should see the dropdown menu", async function () {
  const dropDownMenu = await HomePage.dropDownMenu;
  await expect(dropDownMenu).toBeDisplayed();
});

<<<<<<< HEAD
Then("I should see the {string} link", async function (linkText) {
  const signInLink = await HomePage.signIn;
  await expect(signInLink).toBeDisplayed();
  await expect(signInLink).toHaveText(linkText);
=======
Then('I should see the {string} link', async function (linkText) {
    const signInLink = await HomePage.signIn;
    const isDisplayed = await signInLink.isDisplayed();
    isDisplayed.should.be.true;
    const text = await signInLink.getText();
    expect(text).to.equal(linkText);
>>>>>>> af8484d (Chai integration)
});

When("I click the {string} link", async function (linkText) {
  const signInLink = await HomePage.signIn;
  await expect(signInLink).toBeDisplayed();
  await expect(signInLink).toHaveText(linkText);
  await signInLink.click();
  await browser.waitUntil(async () => {
    return (await browser.getUrl()).includes("/auth/login");
  });
});

Then("I should be redirected to the Login Page", async function () {
  const currentUrl = await browser.getUrl();
  await expect(currentUrl).toContain("/auth/login");
});

Given("I am on the Login page", async function () {
  const currentUrl = await browser.getUrl();
  await expect(currentUrl).toContain("/auth/login");
});

Then("I should see the email and password inputs", async function () {
  const email = await LoginPage.emailInput;
  await expect(email).toBeDisplayed();
  const password = await LoginPage.passwordInput;
  await expect(password).toBeDisplayed();
});

When("I click the Login button", async function () {
  await LoginPage.clickLoginButton();
});

Then(
  "I expect to see error messages {string} and {string}",
  async function (emailError, passwordError) {
    await LoginPage.emailError.waitForDisplayed({ timeout: 3000 });
    await LoginPage.passwordError.waitForDisplayed({ timeout: 3000 });

    await expect(LoginPage.emailError).toHaveText(emailError);
    await expect(LoginPage.passwordError).toHaveText(passwordError);
  }
);

When("I enter an invalid email {string}", async function (invalidEmail) {
  await LoginPage.emailInput.setValue(invalidEmail);
});

Then(
  "I should see the error message {string} for email",
  async function (expectedErrorMessage) {
    await LoginPage.emailError.waitForDisplayed({ timeout: 3000 });
    await expect(LoginPage.emailError).toHaveText(expectedErrorMessage);
  }
);

When(
  "I enter email {string} and password {string}",
  async function (email, password) {
    await LoginPage.login(email, password);
  }
);

Then(
  "I should see the login error message {string}",
  async function (expectedErrorMessage) {
    const loginError = await LoginPage.loginError;
    await loginError.waitForDisplayed({ timeout: 3000 });
    await expect(loginError).toHaveText(expectedErrorMessage);
  }
);

When("I click power tools link", async function () {
  const powerToolsLink = HomePage.powerTools;
  await expect(powerToolsLink).toBeDisplayed();
  await powerToolsLink.click();
});

Then(
  "I should be redirected to the power tools category page",
  async function () {
    await browser.waitUntil(async () => {
      return (await browser.getUrl()).includes("/category/power-tools");
    });

    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain("/category/power-tools");
  }
);

Then("I should see the language button", async function () {
  const languageButton = HomePage.languageButton;
  await expect(languageButton).toBeDisplayed();
});

When("I click the language button", async function () {
  await HomePage.clicklanguageButton();
});

When("I click DE language", async function () {
  await HomePage.clicklanguageDe();
});

Then(
  "I should see {string} in the language button",
  async function (expectedLanguage) {
    const languageButton = HomePage.languageButton;
    await expect(languageButton).toHaveText(expectedLanguage);
  }
);

Then("I should see {string} link", async function (linkText) {
  const registerLink = await LoginPage.registerLink;
  await expect(registerLink).toBeDisplayed();
  await expect(registerLink).toHaveText(linkText);
});

When("I click the register link", async function () {
  await LoginPage.clickRegisterLink();
});

Then("I should be redirected to the Register Page", async function () {
  await browser.waitUntil(async () => {
    return (await browser.getUrl()).includes("/auth/register");
  });

  const currentUrl = await browser.getUrl();
  await expect(currentUrl).toContain("/auth/register");
});
