'use strict';

describe('Directive: cuFocus', function () {

  // load the directive's module
  beforeEach(module('swFrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('Focus event runs scope apply', inject(function ($compile) {
    element = angular.element('<input id="userEmail" type="email" name="email" class="form-control" ng-model="user.email" required cu-focus/>');
    element = $compile(element)(scope);

    spyOn(scope, '$apply').and.callThrough();

    element.val('baz');
    element.triggerHandler('focus');

    expect(scope.$apply).toHaveBeenCalled();
  }));
});
