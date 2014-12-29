'use strict';

/*
* Sample usage of this filter in views/edges.html
*   ng-repeat-start="edge in edges | filter: {name: filterBy.search} | edges:filterBy
*   data: array of edges resulting from "edge in edges | filter: {name: filterBy.search}"
*   filterBy: filterBy
*/
angular.module('swFrontApp')
  .filter('edges', function () {
    return function (data, filterBy) {
      if (filterBy.category.name === 'All') {
        return data;
      } else {
        return data.filter(function(item) {
          return item.category.name === filterBy.category.name;
        });
      }
    };
  });
