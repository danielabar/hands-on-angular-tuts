'use strict';

var LoginPage = function() {

  var loginButton = function() {
    return element(by.buttonText('Log In'));
  };

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
    return loginButton().isEnabled();
  };

  this.submitForm = function() {
    loginButton().click();
  };

};


module.exports = new LoginPage();
