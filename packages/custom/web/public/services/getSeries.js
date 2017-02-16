(function() {
    'use strict';

    function getSeries($http, $q) {
        return {
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


