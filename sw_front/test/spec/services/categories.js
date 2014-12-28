'use strict';

describe('Service: categories', function () {

  // load the service's module
  beforeEach(module('swFrontApp'));

  // instantiate service
  var categories;
  beforeEach(inject(function (_categories_) {
    categories = _categories_;
  }));

  it('Exposes a query function', function () {
    expect(typeof categories.query).toBe('function');
  });

  it('query returns a list of categories', function() {
    var result = categories.query();
    result.forEach(function(item) {
      expect(item.name).not.toBeNull();
    });
  });

});
