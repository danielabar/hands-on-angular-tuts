'use strict';

describe('Login Page', function() {
  var loginPage = require('./login_page.js');

  beforeEach(function () {
    loginPage.navigate();
  });

  it('Displays a login form with disabled submit button', function() {
    var emailInput = element(by.model('user.email'));
    emailInput.sendKeys('foo');
    expect(emailInput.getAttribute('value')).toBe('foo');

    var passwordInput = element(by.model('user.password'));
    passwordInput.sendKeys('bar');
    expect(passwordInput.getAttribute('value')).toBe('bar');

    var loginButton = element(by.buttonText('Log In'));
    expect(loginButton.isEnabled()).toBe(false);
  });

});