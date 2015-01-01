'use strict';

angular.module('swFrontApp')
  .controller('LogoutController', function ($scope, auth, $rootScope) {
    auth.logout();
    $rootScope.$broadcast('$routeChangeStart');
  });
