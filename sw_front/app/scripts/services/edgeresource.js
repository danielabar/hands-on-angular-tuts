'use strict';

angular.module('swFrontApp')
  .factory('EdgeResource', function ($resource) {
    return $resource('/api/edges');
  });
