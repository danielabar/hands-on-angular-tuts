'use strict';

describe('Controller: EdgesCtrl', function () {

  // load the controller's module
  beforeEach(module('swFrontApp'));

  var EdgesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EdgesCtrl = $controller('EdgesCtrl', {
      $scope: scope
    });
  }));

  describe('displayRequirements', function() {

    var reqs;

    it('Concatenates name and value of the requirement', function() {
      reqs = [{name: 'Agility', value: 'd6'}];
      expect(scope.displayRequirements(reqs)).toEqual('Agility d6');
    });

    it('Ignores name if it is null', function() {
      reqs = [{name: null, value: 'Novice'}];
      expect(scope.displayRequirements(reqs)).toEqual('Novice');
    });

    it('Multiple requirements are comma delimited', function() {
      reqs = [
        {name: null, value: 'Novice'},
        {name: 'Agility', value: 'd6'}
      ];
      expect(scope.displayRequirements(reqs)).toEqual('Novice, Agility d6');
    });

  });

  describe('selectEdge', function() {

    var edges = [
      {name: 'Attractive'},
      {name: 'Strong'}
    ];

    it('Sets selected edge to null when already selected', function() {
      scope.unitTestSetSelectedEdge(edges[0]);
      scope.selectEdge(edges[0]);
      expect(scope.unitTestGetSelectedEdge()).toBe(null);
    });

  });

});
