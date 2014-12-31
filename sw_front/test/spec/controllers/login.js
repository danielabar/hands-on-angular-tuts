'use strict';

describe('Controller: LoginController', function () {

  // load the controller's module
  beforeEach(module('swFrontApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.loginForm = {};
    LoginCtrl = $controller('LoginController', {
      $scope: scope
    });
  }));

  it('Submits form to server when valid', function () {
    scope.loginForm.$valid = true;
    expect(scope.login()).toBe(true);
  });

  it('Does not submit form to server when invalid', function () {
    scope.loginForm.$valid = false;
    expect(scope.login()).toBe(false);
  });

});
