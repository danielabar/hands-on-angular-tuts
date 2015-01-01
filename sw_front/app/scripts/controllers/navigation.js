'use strict';

angular.module('swFrontApp')
  .controller('NavigationCtrl', function ($scope, $location, $rootScope) {

    $scope.isActive = function(path) {
      var currentPath = $location.path().split('/')[1].split('?')[0];
      return currentPath === path.split('/')[1];
    };

    $scope.isUserLoggedIn = function() {
      return $rootScope.isUserLoggedIn;
    };
  });
