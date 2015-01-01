'use strict';

describe('Login Page', function() {
  var loginPage = require('./login_page.js');

  beforeEach(function () {
    loginPage.navigate();
  });

  // TODO afterEach -> logout

  it('Displays a login form with disabled submit button', function() {
    expect(loginPage.isLoginButtonEnabled()).toBe(false);

    var formValues = loginPage.fillForm('foo', 'bar');
    expect(formValues.emailVal).toEqual('foo');
    expect(formValues.passwordVal).toEqual('bar');
  });

  it('Displays invalid credentials message on failed login attempt', function() {
    var loginError = element(by.css('.alert'));
    expect(loginError.isDisplayed()).toBe(false);

    loginPage.fillForm('admin@test.com', 'thisIsNotTheAdminPassword');
    loginPage.submitForm();

    expect(loginError.isDisplayed()).toBe(true);
  });

  // TODO successful login redirects to edges page

});