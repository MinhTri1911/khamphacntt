(function() {
    'use strict';

    function Search($http, $q) {
        return {
            Search: function(){
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
        .factory('Search', Search);

    Search.$inject = ['$http', '$q'];

})();


