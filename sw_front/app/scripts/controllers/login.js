'use strict';

angular.module('swFrontApp')
  .controller('LoginController', function ($scope, auth) {

    $scope.login = function() {
      if ($scope.loginForm.$valid) {
        auth.login($scope.user);
        return true;
      } else {
        $scope.loginForm.submitted = true;
        return false;
      }
    };

  });
