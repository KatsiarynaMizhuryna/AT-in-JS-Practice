import Page from '../../core/pages/base.page.js';

class LoginPage extends Page {
  get emailInput() {
    return $('[data-test="email"]');
  }

  get passwordInput() {
    return $('[data-test="password"]');
  }

  get emailError() {
    return $('[data-test="email-error"]');
  }

  get passwordError() {
    return $('[data-test="password-error"]');
  }

  get loginButton() {
    return $('input[data-test="login-submit"]');
  }

  get loginError() {
    return $('[data-test="login-error"]');
  }

  get registerLink() {
    return $('[data-test="register-link"]');
  }

  async login(email, password) {
    await this.emailInput.addValue(email);
    await this.passwordInput.addValue(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async getEmailErrorMessage() {
    return this.emailError.getText();
  }

  async getPasswordErrorMessage() {
    return this.passwordError.getText();
  }

  async clickRegisterLink() {
    return this.registerLink.click();
  }

  async open() {
    await super.open('/auth/login');
  }
}

export default new LoginPage();
