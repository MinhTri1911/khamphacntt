(function() {
    'use strict';

    function getParent($http, $q) {
        return {
            getParent: function(){
                var deferred = $q.defer();

                $http.get('/api/parent')
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
        .factory('getParent', getParent);

    getParent.$inject = ['$http', '$q'];

})();


