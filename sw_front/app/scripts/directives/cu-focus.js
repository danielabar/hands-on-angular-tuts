'use strict';

angular.module('swFrontApp')
  .directive('cuFocus', function () {
    return {
      restrict: 'A',
      require: 'ngModel',

      link: function postLink(scope, element, attrs, controller) {
        controller.$focused = false;

        // Whenever the element having cu-focus attribute is focused, this function will run
        element.bind('focus', function() {
          scope.$apply(function() {
            controller.$focused = true;
          });
        });

        element.bind('blur', function() {
          scope.$apply(function() {
            controller.$focused = false;
          });
        });
      }

    };
  });
