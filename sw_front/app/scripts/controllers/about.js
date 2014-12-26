'use strict';

/**
 * @ngdoc function
 * @name swFrontApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the swFrontApp
 */
angular.module('swFrontApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
