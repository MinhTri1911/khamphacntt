(function() {
    'use strict';

    /* jshint -W098 */

    function WebController($scope, $rootScope, Global, Web, $stateParams, $state, $location, $http, getSeries, getPosts, getCategory, getPostByCategory, getArticle, getPostBySeries, getSearch) {
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
            $rootScope.$title = 'Tất cả bài viết'
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
                $rootScope.$title = 'Bài viết về ' + category.name

                getPostByCategory.getPostByCategory(category._id).then(function(response){
                    var posts = response;
                    angular.forEach(posts, function(value, key) {
                        getSeries.getSeries(value.news_series_id).then(function(response){
                            value.series.push(response);
                        })
                    }, this);
                    $scope.posts = response;

                    // console.log($scope.posts)
                })
            })
        }

        $scope.getPostBySeries = function(){
            getSeries.getSeries($stateParams.id).then(function(response){
                var series = response;
                $rootScope.$title = 'Bài viết về ' + series.name
                getPostBySeries.getPostBySeries(series._id).then(function(response){
                    var posts = response;
                    angular.forEach(posts, function(value, key){
                        getSeries.getSeries(value.news_series_id).then(function(response){
                            value.series.push(response);
                        })
                    }, this);
                    
                    $scope.posts = posts;
                })
            })
        }

        $scope.getArticle = function(){
            getArticle.getArticle($stateParams.slug).then(function(response){

                var article = response;
                $rootScope.$title = article.title;
                getSeries.getSeries(article.news_series_id).then(function(response){
                    article.series.push(response);
                });

                $scope.article = article;

                // console.log($scope.article);
            })

            
        }
        
        $scope.getSearch = function(text){
            $state.go('search', {"text": text, "page": 1, "limit": 1});
            
        }

        $scope.findSearch = function(){
            var params = $location.search()
            $scope.isLoading = true;
            getSearch.getSearch(params.text, params.page, params.limit).then(function (response) {
                $scope.articles = response.data;
                $scope.page = response.page;
                $scope.pages = response.pages;
                $scope.limit = response.limit;
                $scope.text = params.text;
                $scope.total = response.total;
            }, function (error) {
                console.log('error', error);
            }).finally(function () {
                $scope.isLoading = false;
            });
        };
        $scope.loadMore = function () {
            if ($scope.articles.length >= $scope.total) return;
            $scope.isLoading = true;
            getSearch.getSearch($scope.text, $scope.page + 1, $scope.limit).then(function (response) {
                $scope.articles = [].concat($scope.articles, response.data);
                $scope.page = response.page;
                $scope.pages = response.pages;
                $scope.limit = response.limit;
                $scope.total = response.total;
            }, function (error) {
                console.log('error', error);
            }).finally(function () {
                $scope.isLoading = false;
            });
        };
        
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

    WebController.$inject = ['$scope', '$rootScope', 'Global', 'Web', '$stateParams', '$state', '$location', '$http', 'getSeries', 'getPosts', 'getCategory', 'getPostByCategory', 'getArticle', 'getPostBySeries', 'getSearch'];

})();
