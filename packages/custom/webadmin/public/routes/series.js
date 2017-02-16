(function() {
    'use strict';

    function Series($stateProvider) {
        $stateProvider.state('series', {
            url: '/admin/series',
            templateUrl: 'webadmin/views/series/index.html'
        }).state('series create', {
            url: '/admin/series/create',
            templateUrl: 'webadmin/views/series/create.html'
        }).state('series update', {
            url: '/admin/series/update/:id',
            templateUrl: 'webadmin/views/series/update.html'
        })
        ;
    }

    angular
        .module('mean.webadmin')
        .config(Series);

    Series.$inject = ['$stateProvider'];

})();
