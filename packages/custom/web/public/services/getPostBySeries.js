(function() {
    'use strict';

    function getPostBySeries($http, $q) {
        return {
            getPostBySeries: function(news_series_id){
                var deferred = $q.defer();

                $http.get('/api/post/series/' + news_series_id)
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            },
            getPostBySeriesPagination: function(news_series_id, page, limit){
                var deferred = $q.defer();
                $http.get('/api/post/series/paginate/' + news_series_id + '?page=' + (page ? page : '1') + '&limit=' + (limit ? limit : '10')).success(function (response) {
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
        .factory('getPostBySeries', getPostBySeries);

    getPostBySeries.$inject = ['$http', '$q'];

})();


