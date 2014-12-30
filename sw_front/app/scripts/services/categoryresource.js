'use strict';

angular.module('swFrontApp')
  .factory('CategoryResource', function ($resource) {
    return $resource('/api/categories');
  });
