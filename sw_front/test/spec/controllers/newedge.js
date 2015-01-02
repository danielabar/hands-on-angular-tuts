'use strict';

describe('Controller: NewEdgeController', function () {

  // load the controller's module
  beforeEach(module('swFrontApp'));

  var NewedgeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewedgeCtrl = $controller('NewEdgeController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(scope.awesomeThings.length).toBe(3);
  });
});
