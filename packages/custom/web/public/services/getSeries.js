(function() {
    'use strict';

    function getSeries($http, $q) {
        return {
            getSeriesBySlug: function(slug){
                var deferred = $q.defer();

                $http.get('/api/series/slug/' + slug)
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
                
            },
            getSeries: function(id){
                var deferred = $q.defer();
                
                $http.get('/api/series/' + id)
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
        .factory('getSeries', getSeries);

    getSeries.$inject = ['$http', '$q'];

})();


