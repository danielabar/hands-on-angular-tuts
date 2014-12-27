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
      expect(scope.isActive('/edges')).toBe(true);
      expect(location.path).toHaveBeenCalled();
    });

    it('Returns false when input path is different from $location path', function() {
      spyOn(location, 'path').and.returnValue('/edges');
      expect(scope.isActive('/')).toBe(false);
      expect(location.path).toHaveBeenCalled();
    });

    it('Returns true when input path starts with the same word as $location path', function() {
      spyOn(location, 'path').and.returnValue('/test/1/show');
      expect(scope.isActive('/test')).toBe(true);
      expect(location.path).toHaveBeenCalled();
    });

    it('Returns true when input path starts with the same word as $location path followed by query string', function() {
      spyOn(location, 'path').and.returnValue('/test?id=1');
      expect(scope.isActive('/test')).toBe(true);
      expect(location.path).toHaveBeenCalled();
    });

  });

});
