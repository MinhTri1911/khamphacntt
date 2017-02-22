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
            }
        };
    }
    

    angular
        .module('mean.web')
        .factory('getPostBySeries', getPostBySeries);

    getPostBySeries.$inject = ['$http', '$q'];

})();


