'use strict';

describe('Filter: edges', function () {
  var data;
  var filterBy;

  // load the filter's module
  beforeEach(module('swFrontApp'));

  // initialize a new instance of the filter before each test
  var edges;
  beforeEach(inject(function ($filter) {
    edges = $filter('edges');
    initTestData();
  }));

  var initTestData = function() {
    data = [
      {
        requirements: [
          {name: null, value: 'Novice', type: 'rank'},
          {name: 'Agility', value: 'd6', type: 'trait'}
        ],
        category: {name: 'first'}
      },
      {
        requirements: [
          {name: null, value: 'Seasoned', type: 'rank'},
          {name: 'Agility', value: 'd6', type: 'trait'}
        ],
        category: {name: 'second'}
      }
    ];
    filterBy = {
      category: {name: 'first'},
      rank: {name: 'Novice'}
    };
  };

  var verifyEdgeData = function(item, categoryName, requirement0Value, requirement1Value) {
    expect(item.category.name).toEqual(categoryName);
    expect(item.requirements[0].value).toEqual(requirement0Value);
    expect(item.requirements[1].value).toEqual(requirement1Value);
  };

  describe('Category', function() {

    it('Filters by category name', function() {
      filterBy.category.name = 'first';
      filterBy.rank.name = 'All';

      var result = edges(data, filterBy);
      expect(result.length).toEqual(1);
      verifyEdgeData(result[0], 'first', 'Novice', 'd6');
    });

    it('Returns all elements when category filter is All', function() {
      filterBy.category.name = 'All';
      filterBy.rank.name = 'All';

      var result = edges(data, filterBy);
      expect(result.length).toEqual(2);
      verifyEdgeData(result[0], 'first', 'Novice', 'd6');
      verifyEdgeData(result[1], 'second', 'Seasoned', 'd6');
    });

  });

  describe('Rank', function() {

    it('Filters by rank name', function() {
      filterBy.category.name = 'All';
      filterBy.rank.name = 'Novice';

      var result = edges(data, filterBy);
      expect(result.length).toEqual(1);
      verifyEdgeData(result[0], 'first', 'Novice', 'd6');
    });

    it('Returns all elements when rank filter is All', function() {
      filterBy.category.name = 'All';
      filterBy.rank.name = 'All';

      var result = edges(data, filterBy);
      expect(result.length).toEqual(2);
      verifyEdgeData(result[0], 'first', 'Novice', 'd6');
      verifyEdgeData(result[1], 'second', 'Seasoned', 'd6');
    });

  });

  describe('Combined', function() {

    it('Filters by category and rank', function() {
      filterBy.category.name = 'second';
      filterBy.rank.name = 'Seasoned';

      var result = edges(data, filterBy);
      expect(result.length).toEqual(1);
      verifyEdgeData(result[0], 'second', 'Seasoned', 'd6');
    });

    it('Returns an empty list when no data matches filter criteria', function() {
      filterBy.category.name = 'second';
      filterBy.rank.name = 'Novice';

      var result = edges(data, filterBy);
      expect(result.length).toEqual(0);
    });

  });

});
