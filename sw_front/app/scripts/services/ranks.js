'use strict';

// AngularJS will instantiate a singleton by calling "new" on this function
angular.module('swFrontApp')
  .service('ranks', function () {
    this.query = function() {
      return [
        {name: 'All'},
        {name: 'Novice'},
        {name: 'Seasoned'}
      ];
    };
  });
