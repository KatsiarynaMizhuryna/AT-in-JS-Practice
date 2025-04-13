Feature: App functionality

  Scenario: Open Home Page
    Given I am on the homepage
    Then I should see the header
    When I click the categories link
    Then I should see the dropdown menu

  Scenario: Open Power Tools Category page
    Given I am on the homepage
    Then I should see the header
    When I click the categories link
    Then I should see the dropdown menu
    When I click power tools link
    Then I should be redirected to the power tools category page

  Scenario: Open Login Page
    Given I am on the homepage
    Then I should see the "Sign in" link
    When I click the "Sign in" link
    Then I should be redirected to the Login Page

  Scenario: Test Login form with empty credentials
    Given I am on the Login page
    Then I should see the email and password inputs
    When I click the Login button
    Then I expect to see error messages "Email is required" and "Password is required"

  Scenario: Invalid email format
    Given I am on the Login page
    When I enter an invalid email "invalidemail.com"
    When I click the Login button
    Then I should see the error message "Email format is invalid" for email

  Scenario: Login with non-registered user
    Given I am on the Login page
    When I enter email "nonexistent@example.com" and password "WrongPassword123"
    When I click the Login button
    Then I should see the login error message "Invalid email or password"

  Scenario: Register user
    Given I am on the Login page
    Then I should see "Register your account" link
    When I click the register link
    Then I should be redirected to the Register Page

  Scenario: Translation
    Given I am on the homepage
    Then I should see the language button
    When I click the language button
    And I click DE language
    Then I should see "DE" in the language button