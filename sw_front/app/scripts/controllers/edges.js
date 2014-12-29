'use strict';

angular.module('swFrontApp')
  .controller('EdgesCtrl', function ($scope, EdgeResource, categories, ranks) {

    var selectedEdge = null;

    $scope.edges = EdgeResource.query();
    $scope.categories = categories.query();
    $scope.ranks = ranks.query();

    $scope.filterBy = {
      search: '',
      category: $scope.categories[0],
      rank: $scope.ranks[0]
    };

    $scope.selectEdge = function(edge) {
      selectedEdge = (selectedEdge === edge) ? null : edge;
    };

    $scope.isSelected = function(edge) {
      return edge === selectedEdge;
    };

    // Unit testing only
    $scope.unitTestSetSelectedEdge = function(edge) {
      selectedEdge = edge;
    };
    $scope.unitTestGetSelectedEdge = function() {
      return selectedEdge;
    };

    $scope.displayRequirements = function(reqs) {
      var result = '';
      for (var i=0; i<reqs.length; i++) {
        if (result !== '') {
          result += ', ';
        }
        if (reqs[i].name) {
          result += reqs[i].name + ' ' + reqs[i].value;
        } else {
          result += reqs[i].value;
        }
      }
      return result;
    };


  });
