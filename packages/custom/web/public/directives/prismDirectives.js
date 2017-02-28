'use strict';
angular
  .module('mean.webadmin')
  .directive('prism', function () {
  return {
    restrict: 'C',
    link: function ($scope, element, attrs) {
        element.ready(function() {
            Prism.highlightElement(element[0]);
        });
    }
  }
});