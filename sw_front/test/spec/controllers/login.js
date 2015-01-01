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

  afterEach(function() {
    http.resetExpectations();
  });

  it('Posts to login api when form is valid and clears error flag on successful login', function() {
    // Given
    scope.loginForm.$valid = true;
    http.whenPOST('/api/login', {email: user.email, password: user.password}).respond(200, '');

    // When
    scope.login();

    // Then
    http.expectPOST('/api/login', user);
    http.flush();
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
    expect(scope.wrongCredentials).toBe(false);
  });

  it('Posts to login api when form is valid and sets error flag on failure', function() {
    // Given
    scope.loginForm.$valid = true;
    http.whenPOST('/api/login', {email: user.email, password: user.password}).respond(500, '');

    // When
    scope.login();

    // Then
    http.expectPOST('/api/login', user);
    http.flush();
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
    expect(scope.wrongCredentials).toBe(true);
  });


});
