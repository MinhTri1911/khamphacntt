(function() {
    'use strict';

    function getArticle($http, $q) {
        return {
            getArticle: function(slug){
                var deferred = $q.defer();

                $http.get('/api/post/slug/' + slug)
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
        .factory('getArticle', getArticle);

    getArticle.$inject = ['$http', '$q'];

})();


