(function() {
    'use strict';

    function News($stateProvider) {
        $stateProvider.state('post', {
            url: '/admin/post',
            templateUrl: 'webadmin/views/post/index.html'
        }).state('post create', {
            url: '/admin/post/create',
            templateUrl: 'webadmin/views/post/create.html'
        }).state('post update', {
            url: '/admin/post/update/:id',
            templateUrl: 'webadmin/views/post/update.html'
        })
        ;
    }

    angular
        .module('mean.webadmin')
        .config(News);

    News.$inject = ['$stateProvider'];

})();
