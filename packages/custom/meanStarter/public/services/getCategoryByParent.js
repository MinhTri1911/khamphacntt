(function() {
    'use strict';

    function getCategoryByParent($http, $q) {
        return {
            getCategoryByParent: function(parent_id){
                var deferred = $q.defer();

                $http.get('/api/category/parent/' + parent_id)
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
        .factory('getCategoryByParent', getCategoryByParent);

    getCategoryByParent.$inject = ['$http', '$q'];

})();


