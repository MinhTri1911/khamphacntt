(function() {
    'use strict';

    function Upload($stateProvider) {
        $stateProvider.state('upload', {
            url: '/upload/files',
            templateUrl: 'webadmin/views/upload.html'
        })
        .state('uploads', {
            url: '/uploads/files',
            templateUrl: 'webadmin/views/uploads.html'
        })
        ;
    }

    angular
        .module('mean.webadmin')
        .config(Upload);

    Upload.$inject = ['$stateProvider'];

})();
