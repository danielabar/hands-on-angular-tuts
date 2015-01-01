'use strict';

angular.module('swFrontApp')
  .controller('LoginController', function ($scope, auth) {

    $scope.wrongCredentials = false;

    $scope.login = function() {
      if ($scope.loginForm.$valid) {
        var loginPromise = auth.login($scope.user);
        loginPromise.then(handleLoginSuccess, handleLoginError);
      } else {
        $scope.loginForm.submitted = true;
      }
    };

    // TODO change location to edges page or some other view that requires a logged in user
    var handleLoginSuccess = function() {
      $scope.wrongCredentials = false;
    };

    var handleLoginError = function() {
      $scope.wrongCredentials = true;
    };

  });
