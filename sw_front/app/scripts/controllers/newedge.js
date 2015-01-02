'use strict';

// Note this controller ends up as child of parent controllers/edges.js
angular.module('swFrontApp')
  .controller('NewEdgeController', function ($scope, EdgeResource) {

    $scope.newEdge = new EdgeResource;

    $scope.createEdge = function() {
      $scope.newEdge.$save().then(function(response) {
        $scope.edges.push(response);        // update edge list
        $scope.newEdge = new EdgeResource;  // reset to blank form
        $scope.edgeCreateErrorMessage = false;
      },
      function(response) {
        $scope.edgeCreateErrorMessage = response.data.message;
      });
    };

  });
