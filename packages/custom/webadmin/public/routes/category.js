(function() {
    'use strict';

    function Category($stateProvider) {
        $stateProvider.state('category', {
            url: '/admin/category',
            templateUrl: 'webadmin/views/category/index.html',
        }).state('category create', {
            url: '/admin/category/create',
            templateUrl: 'webadmin/views/category/create.html'
        }).state('category update', {
            url: '/admin/category/update/:id',
            templateUrl: 'webadmin/views/category/update.html'
        })
        ;
    }

    angular
        .module('mean.webadmin')
        .config(Category);

    Category.$inject = ['$stateProvider'];

})();
