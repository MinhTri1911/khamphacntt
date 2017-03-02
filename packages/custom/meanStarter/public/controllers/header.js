'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Menus', 'MeanUser', '$state', '$http', 'getParent', 'getCategoryByParent',
  function ($scope, $rootScope, Menus, MeanUser, $state, $http, getParent, getCategoryByParent) {
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $rootScope.$title = "Home";
    var vm = this;
              

    vm.menus = {};
    vm.hdrvars = {
      authenticated: MeanUser.loggedin,
      user: MeanUser.user,
      isAdmin: MeanUser.isAdmin
    };

    // Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu (name, defaultMenu) {
      Menus.query({
        name: name,
        defaultMenu: defaultMenu
      }, function (menu) {
        vm.menus[name] = menu
      });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);
    queryMenu('account', []);

    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function () {
      queryMenu('main', defaultMainMenu);

      vm.hdrvars = {
        authenticated: MeanUser.loggedin,
        user: MeanUser.user,
        isAdmin: MeanUser.isAdmin
      }
    });

    vm.logout = function () {
      MeanUser.logout()
    };

    $rootScope.$on('logout', function () {
      vm.hdrvars = {
        authenticated: false,
        user: {},
        isAdmin: false
      };
      queryMenu('main', defaultMainMenu);
      $state.go('home', $state.current, {}, {reload: true});
    });


    $scope.getAllCate = function(){

      $http.get('/api/parent/notnull')
        .success(function(data){
          $scope.categories = data;
        })

      // getParent.getParent().then(function(response){
      //   var categories = response;

      //   angular.forEach(categories, function(value, key){
      //       getCategoryByParent.getCategoryByParent(value._id).then(function(response){
      //           value.parent.push(response);
      //       });
      //   }, this);
      //   $scope.categories = categories;
      // });
    }

    $scope.series = [];
    $scope.getAllSeries = function(){
      $http.get('/api/series')
        .success(function(data){
          $scope.series = data;
        })
    }
  }
]);
