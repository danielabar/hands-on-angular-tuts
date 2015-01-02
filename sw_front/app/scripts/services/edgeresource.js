'use strict';

angular.module('swFrontApp')
  .factory('EdgeResource', function ($resource) {
    var url = '/api/edges';
    var paramDefaults = {};
    // Since name is also present on create, it breaks POST functionality to have {id: '@name'} as part of paramDefaults
    var actions = {
      'delete': {
        method: 'DELETE',
        params: {id: '@name'},
        url: '/api/edges/:id'
      }
    };
    return $resource(url, paramDefaults, actions);
  });
