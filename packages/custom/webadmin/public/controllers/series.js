(function () {
    'use strict';

    /* jshint -W098 */

    function SeriesController($scope, Global, Series, $stateParams, $state, $http, $location, $window) {
        $scope.global = Global;
        $scope.package = {
            name: 'series'
        };
        
        $scope.checkCircle = function () {
            Series.checkCircle($stateParams.circle).then(function (response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function (error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };

        $scope.listSeries = [];
        $scope.findAll = function(){
            $http.get('/api/series')
                .success(function(data){
                    $scope.listSeries = data;
                })
        };

        $scope.gotoSeries = function(){
            $state.go('series create');
        }
        $scope.gotoIndex = function(){
            $state.go('series');
        }
        $scope.cates = [];

        $scope.findCate = function(){
            $http.get('/api/parent/notnull')
                .success(function(data){
                    $scope.cates = data;
                })
        }

        $scope.create = function(){
            $http.post('/api/series', $scope.series)
                .success(function(data){
                    $state.go('series');
                });
        }

        $scope.edit = function(item){
            $state.go('series update', {id: item._id});
        }

        $scope.findOne = function(){
            $http.get('/api/series/' + $stateParams.id)
                .success(function(data){
                    $scope.series = data;
                });
        }
        $scope.update = function(){
            $http.put('/api/series/' + $stateParams.id, $scope.series)
                .success(function(data){
                    $state.go('series');
                })
        }

        $scope.delete = function(item){

            if ($window.confirm("Please confirm?")) {
                    $http.delete('/api/series/' + item._id)
                        .success(function(data){
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                        })
                }
        }


    }

    angular
        .module('mean.webadmin')
        .controller('SeriesController', SeriesController);

    SeriesController.$inject = ['$scope', 'Global', 'Series', '$stateParams', '$state', '$http', '$location', '$window'];

})();
