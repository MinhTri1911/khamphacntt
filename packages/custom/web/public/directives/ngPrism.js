'use strict';
var app = angular.module('mean.web');

app.directive('ngPrism', [function() {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            source: '@'
        },
        link: function(scope, element, attrs, controller, transclude) {
            if(!scope.source) {
                transclude(function(clone) {
                    element.html(clone);
                    Prism.highlightElement(element.find("code")[0]);
                });
            } else {
                scope.$watch(function() {return scope.source;}, function(v) {
                    if(v) {
                        Prism.highlightElement(element.find("code")[0]);
                    }
                });
            }

        },
        template: "<code ng-bind='source'></code>"
    };

}]);