(function() {
    'use strict';

    /* jshint -W098 */

    function WebadminController($scope, Global, Webadmin, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'webadmin'
        };

        $scope.checkCircle = function() {
            Webadmin.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.webadmin')
        .controller('WebadminController', WebadminController);

    WebadminController.$inject = ['$scope', 'Global', 'Webadmin', '$stateParams'];

})();
