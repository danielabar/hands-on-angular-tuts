'use strict';

describe('Service: ranks', function () {

  // load the service's module
  beforeEach(module('swFrontApp'));

  // instantiate service
  var ranks;
  beforeEach(inject(function (_ranks_) {
    ranks = _ranks_;
  }));

  it('Exposes a query function', function () {
    expect(typeof ranks.query).toBe('function');
  });

  it('query returns a list of categories', function() {
    var result = ranks.query();
    result.forEach(function(item) {
      expect(item.name).not.toBeNull();
    });
  });

});
