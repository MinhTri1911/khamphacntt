(function() {
    'use strict';

    function Webadmin($http, $q) {
        return {
            name: 'webadmin',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/webadmin/example/' + circle).success(function(response) {
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
        .factory('Webadmin', Webadmin);

    Webadmin.$inject = ['$http', '$q'];

})();
