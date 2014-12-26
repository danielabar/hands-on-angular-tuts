'use strict';

describe('Controller: EdgesCtrl', function () {

  // load the controller's module
  beforeEach(module('swFrontApp'));

  var EdgesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EdgesCtrl = $controller('EdgesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(scope.awesomeThings.length).toBe(3);
  });
});
