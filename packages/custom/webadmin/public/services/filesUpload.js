'use strict';
angular
.module('mean.webadmin')
.service('filesUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(files, uploadUrl){
        var fd = new FormData();
        for(var i in files){
            fd.append(i, files[i]._file);
        }      
    
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