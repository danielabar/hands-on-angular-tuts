'use strict';

describe('Login Page', function() {
  var loginPage = require('./login_page.js');

  beforeEach(function () {
    loginPage.navigate();
  });

  it('Displays a login form with disabled submit button', function() {
    expect(loginPage.isLoginButtonEnabled()).toBe(false);

    var formValues = loginPage.fillForm('foo', 'bar');
    browser.pause();
    expect(formValues.emailVal).toEqual('foo');
    expect(formValues.passwordVal).toEqual('bar');
  });

});