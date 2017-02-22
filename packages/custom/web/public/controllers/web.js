(function() {
    'use strict';

    /* jshint -W098 */

    function WebController($scope, Global, Web, $stateParams, $http, getSeries, getPosts, getCategory, getPostByCategory, getArticle) {
        $scope.global = Global;
        $scope.package = {
            name: 'web'
        };

        $scope.checkCircle = function() {
            Web.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
        $scope.getAllPost = function(){

            getPosts.getPosts().then(function(response){
                var posts = response;

                angular.forEach(posts, function(value, key){
                    getSeries.getSeries(value.news_series_id).then(function(response){
                        value.series.push(response);
                    });
                }, this);
                $scope.posts = posts
            })
            
        }

        $scope.getPostsByCategory = function(){

            //console.log($stateParams)
            getCategory.getCategory($stateParams.slug).then(function(response){
                var category = response;

                getPostByCategory.getPostByCategory(category._id).then(function(response){
                    $scope.posts = response;

                    // console.log($scope.posts)
                })
            })
        }

        $scope.getArticle = function(){
            getArticle.getArticle($stateParams.id).then(function(response){
                $scope.article = response;
            })
        }
        
        $scope.editorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            readOnly: 'nocursor',
            mode: 'xml',
        };
        
        
    }

    angular
        .module('mean.web')
        .controller('WebController', WebController);

    WebController.$inject = ['$scope', 'Global', 'Web', '$stateParams', '$http', 'getSeries', 'getPosts', 'getCategory', 'getPostByCategory', 'getArticle'];

})();
