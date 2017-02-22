'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    slug = require('slug'),
    Post = mongoose.model('Post'),
    Series = mongoose.model('Series'),
    _ = require('lodash');

exports.findAll = function(req, res){
    Post.find(function(err, posts){
        if(err){
            return res.send(err);
        }
        res.json(posts);
    })
}
exports.create = function(req, res){

    var post = new Post(req.body);
    
    post.save(function(err, newPost){
        if(err){
            return res.send(400);
        }
        res.json(newPost);
    })
}
exports.edit = function(req, res){
    Post.findOne({_id: req.params.id}, function(err, data){
        if(err){
            return res.send(500);
        }
        res.json(data);
    })
}
exports.update = function(req, res){
    var query = {_id: req.params.id};
    var post = req.post;
    
    post = _.extend(post , req.body);

    post.slug = slug(post.title)

    Post.findOneAndUpdate(query, post, function(err) {
        if (err) {
            return res.send(err);
        } else {
            res.json(post);
        }
    });
}
exports.delete = function(req, res){
    Post.remove({_id: req.params.id}, function(err, deleted){
        if(err) res.send(err)
        res.json(deleted);
    });
}

exports.getPostByCategory = function(req, res){
    Post.find({category_id: req.params.category_id}, function(err, data){
        if(err) res.json(err)
        res.json(data);
    })
}