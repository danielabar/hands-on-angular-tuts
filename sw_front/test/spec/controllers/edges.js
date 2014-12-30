'use strict';

describe('Controller: EdgesCtrl', function () {

  // load the controller's module
  beforeEach(module('swFrontApp'));

  var EdgesCtrl,
    scope,
    http;

  var configureMockHttp = function(http) {
    var edgeResponse = [{key: 'hello'}];
    var categoryResponse = [{name: 'cat1'}];
    var rankResponse = [{name: 'rank1'}];
    http.whenGET('/api/edges').respond(edgeResponse);
    http.whenGET('/api/categories').respond(categoryResponse);
    http.whenGET('/api/ranks').respond(rankResponse);
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    http = $httpBackend;
    configureMockHttp(http);
    EdgesCtrl = $controller('EdgesCtrl', {
      $scope: scope
    });
  }));

  afterEach(function () {
    http.verifyNoOutstandingExpectation();
    http.verifyNoOutstandingRequest();
  });

  it('Controller instantiation makes request to api to fetch edges', function() {
    http.expectGET('/api/edges');
    http.expectGET('/api/categories');
    http.expectGET('/api/ranks');
    http.flush();
  });

  it('Assigns http response data to edges', function() {
    http.flush();
    expect(scope.edges[0].key).toEqual('hello');
    expect(scope.categories[0].name).toEqual('cat1');
    expect(scope.ranks[0].name).toEqual('rank1');
  });

  describe('displayRequirements', function() {

    var reqs;

    it('Concatenates name and value of the requirement', function() {
      http.flush();
      reqs = [{name: 'Agility', value: 'd6'}];
      expect(scope.displayRequirements(reqs)).toEqual('Agility d6');
    });

    it('Ignores name if it is null', function() {
      http.flush();
      reqs = [{name: null, value: 'Novice'}];
      expect(scope.displayRequirements(reqs)).toEqual('Novice');
    });

    it('Multiple requirements are comma delimited', function() {
      http.flush();
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
        http.flush();
        scope.unitTestSetSelectedEdge(edges[0]);
        scope.selectEdge(edges[0]);
        expect(scope.unitTestGetSelectedEdge()).toBe(null);
      });

      it('Sets selected edge to selection when not already selected', function() {
        http.flush();
        scope.unitTestSetSelectedEdge(edges[0]);
        scope.selectEdge(edges[1]);
        expect(scope.unitTestGetSelectedEdge()).toBe(edges[1]);
      });

    });

    describe('isSelected', function() {

      it('Returns true when input edge is the same as selected edge', function() {
        http.flush();
        scope.unitTestSetSelectedEdge(edges[0]);
        expect(scope.isSelected(edges[0])).toBe(true);
      });

      it('Returns false when input edge is different from selected edge', function() {
        http.flush();
        scope.unitTestSetSelectedEdge(edges[0]);
        expect(scope.isSelected(edges[1])).toBe(false);
      });

    });

  });

});
