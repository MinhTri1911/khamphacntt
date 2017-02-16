(function() {
    'use strict';

    function getPosts($http, $q) {
        return {
            getPosts: function(){
                var deferred = $q.defer();

                $http.get('/api/post')
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            }
        };
    }
    

    angular
        .module('mean.web')
        .factory('getPosts', getPosts);

    getPosts.$inject = ['$http', '$q'];

})();


