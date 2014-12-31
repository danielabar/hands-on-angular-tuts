'use strict';

angular.module('swFrontApp')
  .controller('LoginController', function ($scope) {

    $scope.login = function() {
      if ($scope.loginForm.$valid) {
        return true;
      } else {
        $scope.loginForm.submitted = true;
        return false;
      }
    };

  });
