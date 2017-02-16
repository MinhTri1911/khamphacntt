(function() {
    'use strict';

    function Category($http, $q) {
        return {
            name: 'category',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/category/example/' + circle).success(function(response) {
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
        .factory('Category', Category);

    Category.$inject = ['$http', '$q'];

})();


