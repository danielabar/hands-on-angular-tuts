'use strict';

angular.module('swFrontApp')
  .factory('UserResource', function ($resource) {
    return $resource('/api/users');
  });
