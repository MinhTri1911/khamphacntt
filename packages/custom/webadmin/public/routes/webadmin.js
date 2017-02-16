(function() {
    'use strict';

    function Webadmin($stateProvider) {
        $stateProvider.state('webadmin example page', {
            url: '/webadmin/example',
            templateUrl: 'webadmin/views/index.html'
        }).state('webadmin circles example', {
            url: '/webadmin/example/:circle',
            templateUrl: 'webadmin/views/example.html'
        });
    }

    angular
        .module('mean.webadmin')
        .config(Webadmin);

    Webadmin.$inject = ['$stateProvider'];

})();
