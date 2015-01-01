'use strict';

angular.module('swFrontApp')
  .controller('AdminController', function ($scope, UserResource) {
    $scope.users = UserResource.query();
  });
