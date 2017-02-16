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
        }).state('posts', {
            url: '/posts/:slug',
            templateUrl: 'web/views/posts.html'
        }).state('codemirror', {
            url: '/codemirror',
            templateUrl: 'web/views/codemirror.html'
        })
        ;
    }

    angular
        .module('mean.web')
        .config(Web);

    Web.$inject = ['$stateProvider'];

})();
