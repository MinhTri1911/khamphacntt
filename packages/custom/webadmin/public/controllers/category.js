(function () {
    'use strict';

    /* jshint -W098 */

    function CategoryController($log, $scope, $rootScope, Global, Category, $stateParams, $state, $http, $location, $window) {
        $scope.global = Global;
        $scope.package = {
            name: 'category'
        };
        
        $scope.checkCircle = function () {
            Category.checkCircle($stateParams.circle).then(function (response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function (error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
        
        $scope.categories = [];
        $scope.findAll = function(){

            $http.get('api/category')
                .success(function(data){
                    $rootScope.$title = 'Danh mục bài viết';
                    $scope.categories = data;

                    $scope.pageSize = 10;
                    $scope.currentPage = 1;
                    $scope.totalPage = (data.length / $scope.pageSize) + 1;
                })
        };
        
        $scope.findNameCate = function(cate){
            $http.get('/api/parent/' + cate._id)
                .success(function(data){
                    $scope.cate_name = data.name;
                })
        }

        $scope.cates = [];
        $scope.findParent = function(){
            $http.get('/api/parent')
                .success(function(data){
                    $scope.cates = data;
                })
        };

        $scope.gotoCreate = function(){
            $state.go('category create');
            $rootScope.$title = '1111111111111111';
        }
        

        $scope.create = function(isValid){
            if(isValid){
                $http.post('/api/category', $scope.category)
                .success(function(data){
                    $state.go('category');
                });
            }
            
        };

        $scope.gotoIndex = function(){
            $state.go('category');
        }

        $scope.edit = function(cate){
            $state.go('category update', {id: cate._id});
        }
        $scope.findOne = function(){
            $http.get('/api/category/' + $stateParams.id)
                .success(function(data){
                    $scope.category = data;
                });
        } 

        $scope.update = function(){

            $http.put('/api/category/' + $stateParams.id, $scope.category)
                .success(function(category){
                    $state.go('category');
                })
        }

        $scope.delete = function(cate){

            if ($window.confirm('Please confirm?')) {
                $http.delete('/api/category/' + cate._id)
                    .success(function(data){
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    })
            }
        }

        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };
        

    }

    angular
        .module('mean.webadmin')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$log', '$scope', '$rootScope', 'Global', 'Category', '$stateParams', '$state', '$http', '$location', '$window'];

})();
