'use strict';

describe('Service: edges', function () {

  // load the service's module
  beforeEach(module('swFrontApp'));

  // instantiate service
  var edges;
  beforeEach(inject(function (_edges_) {
    edges = _edges_;
  }));

  it('Exposes a query function', function () {
    expect(typeof edges.query).toBe('function');
  });

  it('query returns a list of edges', function() {
    var result = edges.query();
    result.forEach(function(item) {
      expect(item.name).not.toBeNull();
      expect(item.description).not.toBeNull();
      expect(item.category).not.toBeNull();
      expect(item.requirements).not.toBeNull();
    });
  });

});
