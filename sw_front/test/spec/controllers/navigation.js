'use strict';

describe('Controller: NavigationCtrl', function () {

  // load the controller's module
  beforeEach(module('swFrontApp'));

  var NavigationCtrl,
    scope,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    location = $location;
    NavigationCtrl = $controller('NavigationCtrl', {
      $scope: scope
    });
  }));

  describe('isActive', function() {

    it('Returns true when input path is the same as $location path', function() {
      spyOn(location, 'path').and.returnValue('/edges');
      var result = scope.isActive('/edges');
      expect(result).toBe(true);
      expect(location.path).toHaveBeenCalled();
    });

    it('Returns false when input path is different from $location path', function() {
      spyOn(location, 'path').and.returnValue('/edges');
      var result = scope.isActive('/');
      expect(result).toBe(false);

      expect(location.path).toHaveBeenCalled();
    });

  });

});
