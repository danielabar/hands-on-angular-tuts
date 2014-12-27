'use strict';

angular.module('swFrontApp')
  .controller('EdgesCtrl', function ($scope) {

    var selectedEdge = null;

    $scope.edges = [
      {
        name: 'Attractive',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus nisi aut vero molestiae ipsum cumque ratione et laborum amet! Molestias!',
        category: {
          name: 'Background'
        },
        requirements: [
          {name: null, value: 'Novice'},
          {name: 'Vigor', value: 'd6'}
        ]
      },
      {
        name: 'Strong',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, iure aspernatur quibusdam nobis. Labore, ipsam.',
        category: {
          name: 'Background'
        },
        requirements: [
          {name: null, value: 'Novice'},
          {name: 'Vigor', value: 'd8'}
        ]
      }
    ];

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
