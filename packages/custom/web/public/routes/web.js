(function() {
    'use strict';

    function Web($stateProvider) {
        $stateProvider.state('web example page', {
            url: '/web/example',
            templateUrl: 'web/views/index.html'
        }).state('web circles example', {
            url: '/web/example/:circle',
            templateUrl: 'web/views/example.html'
        }).state('dashboard', {
            url: '/dashboard',
            templateUrl: 'web/views/dashboard.html'
        }).state('category post', {
            url: '/category/:slug',
            templateUrl: 'web/views/category.html'
        }).state('codemirror', {
            url: '/codemirror',
            templateUrl: 'web/views/codemirror.html'
        }).state('article', {
            url: '/article/:id',
            templateUrl: 'web/views/detailpost.html'
        }).state('series post',{
            url: '/series/:id',
            templateUrl: 'web/views/series.html'
        })
        ;
    }

    angular
        .module('mean.web')
        .config(Web);

    Web.$inject = ['$stateProvider'];

})();
