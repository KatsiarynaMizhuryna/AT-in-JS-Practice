import loginPage from "../../business/pages/login.page";
import { expect } from "chai";

describe("Login Page Tests", () => {
  beforeEach(async () => {
    await browser.url("/auth/login");
  });

  it("should display email and password inputs", async () => {
    expect(await loginPage.emailInput.isDisplayed()).to.be.true;
    expect(await loginPage.passwordInput.isDisplayed()).to.be.true;
  });

  it("should show error messages for empty login form", async () => {
    await loginPage.clickLoginButton();
    await loginPage.emailError.waitForDisplayed();
    await loginPage.passwordError.waitForDisplayed();

    expect(await loginPage.emailError.getText()).to.equal("Email is required");
    expect(await loginPage.passwordError.getText()).to.equal(
      "Password is required"
    );
  });

  it("should show an error for invalid email", async () => {
    await loginPage.emailInput.setValue("invalid-email");
    await loginPage.clickLoginButton();
    await loginPage.emailError.waitForDisplayed();

    expect(await loginPage.emailError.getText()).to.equal(
      "Email format is invalid"
    );
  });

  it("should show a login error message for wrong credentials", async () => {
    await loginPage.login("test@example.com", "wrongpassword");
    await loginPage.clickLoginButton();
    await loginPage.loginError.waitForDisplayed();

    expect(await loginPage.loginError.getText()).to.equal(
      "Invalid email or password"
    );
  });
});
