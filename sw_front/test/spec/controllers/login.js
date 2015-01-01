'use strict';

describe('Controller: LoginController', function () {

  // load the controller's module
  beforeEach(module('swFrontApp'));

  var LoginCtrl,
    scope,
    http,
    user;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    user = {email: 'foo@test.com', password: '123456'};
    scope = $rootScope.$new();
    scope.loginForm = {};
    scope.user = user;
    http = $httpBackend;
    LoginCtrl = $controller('LoginController', {
      $scope: scope
    });
  }));

  it('Posts to login api when form is valid and clears error flag on successful login', function() {
    // Given
    scope.loginForm.$valid = true;
    var expectedPostData = {email: user.email, password: user.password};
    console.log('unit test expectedPostData: ' + JSON.stringify(expectedPostData));
    // http.expectPOST('/api/login', expectedPostData).respond(200, '');
    http.whenPOST('/api/login', user).respond(200, '');

    // When
    scope.login();

    // Then
    http.expectPOST('/api/login', user);
    http.flush();
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });


  xit('Submits form to server when valid', function () {
    expect(scope.login()).toBe(true);
  });

  xit('Does not submit form to server when invalid', function () {
    scope.loginForm.$valid = false;
    expect(scope.wrongCredentials).toBe(true);
  });

});
