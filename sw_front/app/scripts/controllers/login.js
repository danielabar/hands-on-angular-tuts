'use strict';

angular.module('swFrontApp')
  .controller('LoginController', function ($scope, auth, $location) {

    $scope.wrongCredentials = false;

    $scope.login = function() {
      if ($scope.loginForm.$valid) {
        var loginPromise = auth.login($scope.user);
        loginPromise.then(handleLoginSuccess, handleLoginError);
      } else {
        $scope.loginForm.submitted = true;
      }
    };

    var handleLoginSuccess = function() {
      $scope.wrongCredentials = false;
      $location.path('/edges');
    };

    var handleLoginError = function() {
      $scope.wrongCredentials = true;
    };

  });
