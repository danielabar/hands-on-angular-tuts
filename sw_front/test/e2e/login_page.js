'use strict';

var LoginPage = function() {

  this.navigate = function() {
    browser.get('/#/login');
  };

  this.fillForm = function(email, password) {
    var emailInput = element(by.model('user.email'));
    var passwordInput = element(by.model('user.password'));

    emailInput.sendKeys(email);
    passwordInput.sendKeys(password);

    return {
      emailVal: emailInput.getAttribute('value'),
      passwordVal: passwordInput.getAttribute('value')
    };
  };

  this.isLoginButtonEnabled = function() {
    var loginButton = element(by.buttonText('Log In'));
    return loginButton.isEnabled();
  };

};


module.exports = new LoginPage();
