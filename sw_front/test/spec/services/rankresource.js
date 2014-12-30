'use strict';

describe('Service: RankResource', function () {

  // load the service's module
  beforeEach(module('swFrontApp'));

  // instantiate service
  var RankResource;
  beforeEach(inject(function (_RankResource_) {
    RankResource = _RankResource_;
  }));

  it('should do something', function () {
    expect(!!RankResource).toBe(true);
  });

});
