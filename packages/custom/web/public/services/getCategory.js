(function() {
    'use strict';

    function getCategory($http, $q) {
        return {
            getCategory: function(slug){
                var deferred = $q.defer();

                $http.get('/api/category/slug/' + slug)
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
        .factory('getCategory', getCategory);

    getCategory.$inject = ['$http', '$q'];

})();


