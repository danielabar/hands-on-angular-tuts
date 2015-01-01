'use strict';

angular.module('swFrontApp')
  .controller('LogoutController', function ($scope, auth) {
    auth.logout();
  });
