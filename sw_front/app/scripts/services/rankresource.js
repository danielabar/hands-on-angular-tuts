'use strict';

angular.module('swFrontApp')
  .factory('RankResource', function ($resource) {
    return $resource('/api/ranks');
  });
