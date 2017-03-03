(function() {
    'use strict';

    function getPostByCategory($http, $q) {
        return {
            getPostByCategory: function(category_id){
                var deferred = $q.defer();

                $http.get('/api/post/category/' + category_id)
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            },
            getPostByCategoryPagination: function(category_id, page, limit){
                var deferred = $q.defer();
                $http.get('/api/post/category/paginate/' + category_id + '?page=' + (page ? page : '1') + '&limit=' + (limit ? limit : '10')).success(function (response) {
                deferred.resolve(response);
                }).error(function (response) {
                deferred.reject(response);
                });
                return deferred.promise;
            }
        };
    }
    

    angular
        .module('mean.web')
        .factory('getPostByCategory', getPostByCategory);

    getPostByCategory.$inject = ['$http', '$q'];

})();


