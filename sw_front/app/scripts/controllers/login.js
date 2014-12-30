'use strict';

angular.module('swFrontApp')
  .controller('LoginController', function ($scope) {

    $scope.login = function() {
      if ($scope.loginForm.$valid) {
        console.log('sending request to server');
      } else {
        console.log('form is invalid');
      }
    };

  });
