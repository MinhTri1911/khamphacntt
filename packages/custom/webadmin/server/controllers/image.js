'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path');
var mime = require('mime');

function getFile(dir, res){
    var file = dir;

    // res.json(file)
    var filename = path.basename(file);

    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
}

exports.getImage = function(req, res, next){
    var imgname = req.params.imgname;

    var dir = './files/uploads/' + imgname;
    getFile(dir, res);    
}
exports.getImages = function(req, res, next){
    var imgname = req.params.imgname;

    var dir = './files/uploads/details/' + imgname;
    getFile(dir, res);    
}