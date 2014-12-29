'use strict';

describe('Service: EdgeResource', function () {

  // load the service's module
  beforeEach(module('swFrontApp'));

  // instantiate service
  var EdgeResource;
  beforeEach(inject(function (_EdgeResource_) {
    EdgeResource = _EdgeResource_;
  }));

  it('should do something', function () {
    expect(!!EdgeResource).toBe(true);
  });

});
