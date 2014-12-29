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

  describe('Category', function() {

    it('Filters by category name', function() {
      expect(edges(data, filterBy).length).toEqual(1);
      expect(edges(data, filterBy)[0].category.name).toEqual('first');
    });

    it('Returns all elements when category filter is All', function() {
      filterBy.category.name = 'All';
      expect(edges(data, filterBy).length).toEqual(2);
      expect(edges(data, filterBy)[0].category.name).toEqual('first');
      expect(edges(data, filterBy)[1].category.name).toEqual('second');
    });

  });

  describe('Rank', function() {

    it('Filters by rank name', function() {
      expect(edges(data, filterBy).length).toEqual(1);

    });

  });

});
