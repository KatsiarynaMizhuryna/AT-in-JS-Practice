const LoginPage = require('../pageobjects/login.page');
const { expect } = require('chai');

describe('Login Page Tests', () => {

    beforeEach(async () => {
        await browser.url('/auth/login');
    });

    it('should display email and password inputs', async () => {
        expect(await LoginPage.emailInput.isDisplayed()).to.be.true;
        expect(await LoginPage.passwordInput.isDisplayed()).to.be.true;
    });

    it('should show error messages for empty login form', async () => {
        await LoginPage.clickLoginButton();
        await LoginPage.emailError.waitForDisplayed();
        await LoginPage.passwordError.waitForDisplayed();
        
        expect(await LoginPage.emailError.getText()).to.equal('Email is required');
        expect(await LoginPage.passwordError.getText()).to.equal('Password is required');
    });

    it('should show an error for invalid email', async () => {
        await LoginPage.emailInput.setValue('invalid-email');
        await LoginPage.clickLoginButton();
        await LoginPage.emailError.waitForDisplayed();
        
        expect(await LoginPage.emailError.getText()).to.equal('Email format is invalid');
    });

    it('should show a login error message for wrong credentials', async () => {
        await LoginPage.login('test@example.com', 'wrongpassword');
        await LoginPage.clickLoginButton();
        await LoginPage.loginError.waitForDisplayed();
        
        expect(await LoginPage.loginError.getText()).to.equal('Invalid email or password');
    });

<<<<<<< HEAD
});
=======
});
>>>>>>> 9f7f7d0 (Code refactor)
