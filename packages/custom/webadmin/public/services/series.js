(function() {
    'use strict';

    function Series($http, $q) {
        return {
            name: 'series',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/series/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }
    

    angular
        .module('mean.webadmin')
        .factory('Series', Series);

    Series.$inject = ['$http', '$q'];

})();
