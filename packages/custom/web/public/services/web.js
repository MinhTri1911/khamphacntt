(function() {
    'use strict';

    function Web($http, $q) {
        return {
            name: 'web',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/web/example/' + circle).success(function(response) {
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
        .factory('Web', Web);

    Web.$inject = ['$http', '$q'];

})();
