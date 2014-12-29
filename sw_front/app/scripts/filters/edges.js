'use strict';

/*
* Sample usage of this filter in views/edges.html
*   ng-repeat-start="edge in edges | filter: {name: filterBy.search} | edges:filterBy
*   data: array of edges resulting from "edge in edges | filter: {name: filterBy.search}"
*   filterBy: filterBy
*/
angular.module('swFrontApp')
  .filter('edges', function () {

    var getRank = function(requirements) {
      for (var i=0; i<requirements.length; i++) {
        if (requirements[i].type === 'rank') {
          return requirements[i].value;
        }
      }
    };

    return function (data, filterBy) {
      return data.filter(function(item) {
        var category = (filterBy.category.name === 'All' || item.category.name === filterBy.category.name);
        var rank = (filterBy.rank.name === 'All' || getRank(item.requirements) === filterBy.rank.name);
        return category && rank;
      });
    };
  });
