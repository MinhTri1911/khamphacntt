(function() {
    'use strict';

    function Post($http, $q) {
        return {
            name: 'news',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/post/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }
    

    angular
        .module('mean.webadmin')
        .factory('Post', Post);

    Post.$inject = ['$http', '$q'];

})();
