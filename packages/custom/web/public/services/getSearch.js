(function() {
    'use strict';

    function getSearch($http, $q) {
        return {
            getSearch: function(value, page, limit){
                var deferred = $q.defer();
                $http.get('/api/search?text=' + value + '&page=' + (page ? page : '1') + '&limit=' + (limit ? limit : '10')).success(function (response) {
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
        .factory('getSearch', getSearch);

    getSearch.$inject = ['$http', '$q'];

})();


