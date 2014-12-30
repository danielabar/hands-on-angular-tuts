'use strict';

describe('Service: CategoryResource', function () {

  // load the service's module
  beforeEach(module('swFrontApp'));

  // instantiate service
  var CategoryResource;
  beforeEach(inject(function (_CategoryResource_) {
    CategoryResource = _CategoryResource_;
  }));

  it('should do something', function () {
    expect(!!CategoryResource).toBe(true);
  });

});
