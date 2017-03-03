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
            
            getCategory.getCategory($stateParams.slug).then(function(response){
                var category = response;
                $scope.isLoading = true;
                getPostByCategory.getPostByCategoryPagination(category._id,1,5).then(function(response){
                    
                    $scope.pageByCate = response.page;
                    $scope.pagesByCate = response.pages;
                    $scope.limit = response.limit;
                    $scope.category_id = category._id;
                    $scope.totalByCate = response.total;

                    var postsByCate = response.data;
                    angular.forEach(postsByCate, function(value, key) {
                        getSeries.getSeries(value.news_series_id).then(function(response){
                            value.series.push(response);
                        })
                    }, this);
                    $scope.postsByCate = postsByCate;
                }, function (error) {
                    console.log('error', error);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            });

            //console.log($stateParams)
            // getCategory.getCategory($stateParams.slug).then(function(response){
            //     var category = response;
            //     $rootScope.$title = 'Bài viết về ' + category.name

            //     getPostByCategory.getPostByCategory(category._id).then(function(response){
            //         var posts = response;
            //         angular.forEach(posts, function(value, key) {
            //             getSeries.getSeries(value.news_series_id).then(function(response){
            //                 value.series.push(response);
            //             })
            //         }, this);
            //         $scope.posts = response;

            //         // console.log($scope.posts)
            //     })
            // })
        }
        $scope.loadMoreByCategory = function(){
            if ($scope.postsByCate.length >= $scope.totalByCate) return;
            $scope.isLoading = true;
            getPostByCategory.getPostByCategoryPagination($scope.category_id, $scope.pageByCate + 1, $scope.limit).then(function(response){
                $scope.pageByCate = response.page;
                $scope.pagesByCate = response.pages;
                $scope.limit = response.limit;
                $scope.totalByCate = response.total;

                var postsByCate = response.data;
                angular.forEach(postsByCate, function(value, key) {
                    getSeries.getSeries(value.news_series_id).then(function(response){
                        value.series.push(response);
                    })
                }, this);

                $scope.postsByCate = [].concat($scope.postsByCate, postsByCate);
            }, function (error) {
                console.log('error', error);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        $scope.getPostBySeries = function(){
            getSeries.getSeriesBySlug($stateParams.slug).then(function(response){
                var series = response;
                $scope.series = series;
                $scope.isLoading = true;
                getPostBySeries.getPostBySeriesPagination(series._id,1,5).then(function(response){
                    
                    $scope.pageBySeries = response.page;
                    $scope.pagesBySeries = response.pages;
                    $scope.limit = response.limit;
                    $scope.news_series_id = series._id;
                    $scope.totalBySeries = response.total;

                    var postsBySeries = response.data;
                    angular.forEach(postsBySeries, function(value, key) {
                        value.series.push(series);
                    }, this);
                    $scope.postsBySeries = postsBySeries;
                }, function (error) {
                    console.log('error', error);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            })

            // getSeries.getSeries($stateParams.slug).then(function(response){
            //     var series = response;
            //     $rootScope.$title = 'Bài viết về ' + series.name
            //     getPostBySeries.getPostBySeries(series._id).then(function(response){
            //         var posts = response;
            //         angular.forEach(posts, function(value, key){
            //             getSeries.getSeries(value.news_series_id).then(function(response){
            //                 value.series.push(response);
            //             })
            //         }, this);
                    
            //         $scope.posts = posts;
            //     })
            // })
        }

        $scope.loadMoreBySeries = function(){
            if ($scope.postsBySeries.length >= $scope.totalBySeries) return;
            $scope.isLoading = true;
            getPostBySeries.getPostBySeriesPagination($scope.news_series_id, $scope.pageBySeries + 1, $scope.limit).then(function(response){
                $scope.pageBySeries = response.page;
                $scope.pagesBySeries = response.pages;
                $scope.limit = response.limit;
                $scope.totalBySeries = response.total;

                var postsBySeries = response.data;
                angular.forEach(postsBySeries, function(value, key) {
                    value.series.push($scope.series);
                }, this);

                $scope.postsBySeries = [].concat($scope.postsBySeries, postsBySeries);
            }, function (error) {
                console.log('error', error);
            }).finally(function () {
                $scope.isLoading = false;
            });
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
            $state.go('search', {'text': text, 'page': 1, 'limit': 5});
            
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
