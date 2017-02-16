'use strict';
angular
.module('mean.webadmin')
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('image', file);
    
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
    
        .success(function(){
        })
    
        .error(function(){
        });
    }
}]);