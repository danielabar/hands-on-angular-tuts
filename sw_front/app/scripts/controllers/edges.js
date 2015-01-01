'use strict';

angular.module('swFrontApp')
  .controller('EdgesCtrl', function ($scope, $q, EdgeResource, CategoryResource, RankResource, $rootScope) {

    var selectedEdge = null;

    $scope.edges = EdgeResource.query();

    var categoryPromise = function() {
      var deferred = $q.defer();
      var result = CategoryResource.query(function() {
        deferred.resolve(result);
      });
      return deferred.promise;
    };

    var rankPromise = function() {
      var deferred = $q.defer();
      var result = RankResource.query(function() {
        deferred.resolve(result);
      });
      return deferred.promise;
    };

    $q.all([
     categoryPromise(),
     rankPromise()
     ]).then(function(data) {
       $scope.categories = data[0];
       $scope.createCategories = $scope.categories.slice(1);
       $scope.ranks = data[1];
       $scope.filterBy = {
        search: '',
        category: $scope.categories[0],
        rank: $scope.ranks[0]
      };
    });

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

    $scope.isUserLoggedIn = function() {
      return $rootScope.isUserLoggedIn;
    };

  });
