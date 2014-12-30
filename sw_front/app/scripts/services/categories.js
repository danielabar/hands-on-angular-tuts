'use strict';

// Unused, replaced by CategoryResource factory using $resource
// AngularJS will instantiate a singleton by calling "new" on this function
angular.module('swFrontApp')
  .service('categories', function () {
    this.query = function() {
      return [
        {name: 'All'},
        {name: 'Background'},
        {name: 'Combat'},
        {name: 'Leadership'}
      ];
    };
  });
