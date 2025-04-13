import { Given, When, Then } from "@wdio/cucumber-framework";
import loginPage from "../../business/pages/login.page";
import homePage from "../../business/pages/home.page";

Given("I am on the homepage", async function () {
  await homePage.open();
});

Then("I should see the header", async function () {
  const header = await homePage.header;
  await expect(header).toBeDisplayed();
});

When("I click the categories link", async function () {
  const categoriesLink = await homePage.categoriesLink;
  await categoriesLink.click();
});

Then("I should see the dropdown menu", async function () {
  const dropDownMenu = await homePage.dropDownMenu;
  await expect(dropDownMenu).toBeDisplayed();
});

Then("I should see the {string} link", async function (linkText) {
  const signInLink = await homePage.signIn;
  await expect(signInLink).toBeDisplayed();
  await expect(signInLink).toHaveText(linkText);
});

When("I click the {string} link", async function (linkText) {
  const signInLink = await homePage.signIn;
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
  const email = await loginPage.emailInput;
  await expect(email).toBeDisplayed();
  const password = await loginPage.passwordInput;
  await expect(password).toBeDisplayed();
});

When("I click the Login button", async function () {
  await loginPage.clickLoginButton();
});

Then(
  "I expect to see error messages {string} and {string}",
  async function (emailError, passwordError) {
    await loginPage.emailError.waitForDisplayed({ timeout: 3000 });
    await loginPage.passwordError.waitForDisplayed({ timeout: 3000 });

    await expect(loginPage.emailError).toHaveText(emailError);
    await expect(loginPage.passwordError).toHaveText(passwordError);
  }
);

When("I enter an invalid email {string}", async function (invalidEmail) {
  await loginPage.emailInput.setValue(invalidEmail);
});

Then(
  "I should see the error message {string} for email",
  async function (expectedErrorMessage) {
    await loginPage.emailError.waitForDisplayed({ timeout: 3000 });
    await expect(loginPage.emailError).toHaveText(expectedErrorMessage);
  }
);

When(
  "I enter email {string} and password {string}",
  async function (email, password) {
    await loginPage.login(email, password);
  }
);

Then(
  "I should see the login error message {string}",
  async function (expectedErrorMessage) {
    const loginError = await loginPage.loginError;
    await loginError.waitForDisplayed({ timeout: 3000 });
    await expect(loginError).toHaveText(expectedErrorMessage);
  }
);

When("I click power tools link", async function () {
  const powerToolsLink = homePage.powerTools;
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
  const languageButton = homePage.languageButton;
  await expect(languageButton).toBeDisplayed();
});

When("I click the language button", async function () {
  await homePage.clicklanguageButton();
});

When("I click DE language", async function () {
  await homePage.clicklanguageDe();
});

Then(
  "I should see {string} in the language button",
  async function (expectedLanguage) {
    const languageButton = homePage.languageButton;
    await expect(languageButton).toHaveText(expectedLanguage);
  }
);

Then("I should see {string} link", async function (linkText) {
  const registerLink = await loginPage.registerLink;
  await expect(registerLink).toBeDisplayed();
  await expect(registerLink).toHaveText(linkText);
});

When("I click the register link", async function () {
  await loginPage.clickRegisterLink();
});

Then("I should be redirected to the Register Page", async function () {
  await browser.waitUntil(async () => {
    return (await browser.getUrl()).includes("/auth/register");
  });

  const currentUrl = await browser.getUrl();
  await expect(currentUrl).toContain("/auth/register");
});
