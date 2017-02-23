'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose')

exports.postUpload = function(req, res, next){
    var files = req.files;
    console.log(files)
    res.send(files);
}
exports.postUploads = function(req, res, next){
    var files = req.files;
    console.log(files)
    res.send(files);
}