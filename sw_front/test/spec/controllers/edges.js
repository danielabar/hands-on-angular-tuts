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

  describe('Egde Selection', function() {

    var edges = [
      {name: 'Attractive'},
      {name: 'Strong'}
    ];

    afterEach(function() {
      scope.unitTestSetSelectedEdge(null);
    });

    describe('selectEdge', function() {

      it('Sets selected edge to null when already selected', function() {
        scope.unitTestSetSelectedEdge(edges[0]);
        scope.selectEdge(edges[0]);
        expect(scope.unitTestGetSelectedEdge()).toBe(null);
      });

      it('Sets selected edge to selection when not already selected', function() {
        scope.unitTestSetSelectedEdge(edges[0]);
        scope.selectEdge(edges[1]);
        expect(scope.unitTestGetSelectedEdge()).toBe(edges[1]);
      });

    });

    describe('isSelected', function() {

      it('Returns true when input edge is the same as selected edge', function() {
        scope.unitTestSetSelectedEdge(edges[0]);
        expect(scope.isSelected(edges[0])).toBe(true);
      });

      it('Returns false when input edge is different from selected edge', function() {
        scope.unitTestSetSelectedEdge(edges[0]);
        expect(scope.isSelected(edges[1])).toBe(false);
      });

    });

  });

});
