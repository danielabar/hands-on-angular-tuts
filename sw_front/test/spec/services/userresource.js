'use strict';

describe('Service: UserResource', function () {

  // load the service's module
  beforeEach(module('swFrontApp'));

  // instantiate service
  var UserResource;
  beforeEach(inject(function (_UserResource_) {
    UserResource = _UserResource_;
  }));

  it('should do something', function () {
    expect(!!UserResource).toBe(true);
  });

});
