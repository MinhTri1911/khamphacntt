(function () {
    'use strict';

    /* jshint -W098 */

    function PostController($scope, Global, Post, $stateParams, $state, $http, $location, $window, $rootScope, MeanUser) {
        $scope.global = Global;
        $scope.package = {
            name: 'post'
        };
        $scope.checkCircle = function () {
            Post.checkCircle($stateParams.circle).then(function (response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function (error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
        $scope.posts = [];
        $scope.findAll = function(){
            $http.get('/api/post')
                .success(function(data){
                    $scope.posts = data;
                })
        };

        $scope.gotoCreate = function(){
            // console.log($location.$$host);
            $state.go('post create');
        }
        $scope.gotoIndex = function(){
            $state.go('post');
        }
        $scope.edit = function(post){
            $state.go('post update', {id: post._id});
        }

        $scope.findOne = function(){
            $http.get('/api/post/' + $stateParams.id)
                .success(function(data){
                    $scope.post = data;
                });

        }

        $scope.update = function(){
            $scope.post.updated_at = Date.now;
            $scope.post.image = $scope.image;
            for(var i in $scope.images)
                $scope.post.images.push($scope.images[i]);

            //console.log($scope.post.images)
            $http.put('/api/post/' + $stateParams.id, $scope.post)
                .success(function(post){
                    $state.go('post');
                })
        }

        $scope.cates = [];
        $scope.findCategory = function(){
            $http.get('/api/parent/notnull')
                .success(function(data){
                    $scope.cates = data;
                })
        }
        $scope.series = [];

        $scope.findSeries = function(){
            $http.get('/api/series')
                .success(function(data){
                    $scope.series = data;
                })
        };
        
        $scope.create = function(){

            //console.log($scope.post)
            $scope.post.user_id = MeanUser.user._id;
            $scope.post.image = $scope.image;
            $scope.post.images = $scope.images;

            $http.post('/api/post', $scope.post)
                .success(function(data){
                    $state.go('post');
                });
        };

        $scope.delete = function(post){

            if ($window.confirm("Please confirm?")) {
                $http.delete('/api/post/' + post._id)
                    .success(function(data){
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    })
            }
        }

        $scope.viewImage = function(){
            $scope.hinhanh = $scope.image;
        }

        $scope.viewImages = function(){
            $scope.hinhanhs = $scope.images;
        }

        // $scope.findSeries();
        // $scope.findCategory();
        // $scope.findAll();

    }


    angular
        .module('mean.webadmin')
        .controller('PostController', PostController);

    PostController.$inject = ['$scope', 'Global', 'Series', '$stateParams', '$state', '$http', '$location', '$window', '$rootScope', 'MeanUser'];

})();
