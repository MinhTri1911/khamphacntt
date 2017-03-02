'use strict';

var app = angular.module('mean.webadmin');
app.directive('dropzoneMultiple', dropzoneMultiple);
function dropzoneMultiple(){
    return function(scope, element, attrs) {

        var config = {
            url : 'api/uploads/files',
            maxFilesize: 100,
            paramName: 'uploadfile',
            maxThumbnailFilesize: 10,
            parallelUploads: 10,
            autoProcessQueue: true
        };
        scope.images = [];
        var eventHandlers = {
            'addedfile': function(file) {           
                scope.file = file;
                // if (this.files[1]!=null) {
                //     this.removeFile(this.files[0]);
                // }
                scope.$apply(function() {
                    scope.fileAdded = true;
                });
            },

            'success': function (file, response) {
                scope.images.push(response[0].filename);
            }
        };

        dropzone = new Dropzone(element[0], config);

        angular.forEach(eventHandlers, function(handler, event) {
            dropzone.on(event, handler);
        });


        scope.processDropzone = function() {
            dropzone.processQueue();
        };

        scope.resetDropzone = function() {
            dropzone.removeAllFiles();
        }
    }
}

app.directive('dropzone', dropzone);
function dropzone(){
    return function(scope, element, attrs) {

        var config = {
            url : 'api/upload/files',
            maxFilesize: 100,
            paramName: 'uploadfile',
            maxThumbnailFilesize: 10,
            parallelUploads: 10,
            autoProcessQueue: true
        };
        var eventHandlers = {
            'addedfile': function(file) {           
                scope.file = file;
                if (this.files[1]!=null) {
                    this.removeFile(this.files[0]);
                }
                scope.$apply(function() {
                    scope.fileAdded = true;
                });
            },

            'success': function (file, response) {
                scope.image = response[0].filename;
            }
        };

        dropzone = new Dropzone(element[0], config);

        angular.forEach(eventHandlers, function(handler, event) {
            dropzone.on(event, handler);
        });


        scope.processDropzone = function() {
            dropzone.processQueue();
        };

        scope.resetDropzone = function() {
            dropzone.removeAllFiles();
        }
    }
}