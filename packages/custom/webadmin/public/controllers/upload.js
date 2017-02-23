'use strict';
angular
.module('mean.webadmin')
.controller('UploadController', ['$scope', 'fileUpload', 'filesUpload', '$state', function($scope, fileUpload, filesUpload, $state){
    
    $scope.uploadFile = function(){
        var file = $scope.image;
        
        alert(file);
        console.dir(file);
        
        // var uploadUrl = "/api/upload/files";
        // fileUpload.uploadFileToUrl(file, uploadUrl);

        // $state.go('home')
    };

    $scope.uploadFiles = function(){

        var files = $scope.images;
        
        alert(files)
        console.dir(files);
        
        // var uploadUrl = "/api/uploads/files";
        // filesUpload.uploadFileToUrl(files, uploadUrl);
        // $state.go('home');
        
    };
}]);