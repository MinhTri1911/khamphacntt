'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    slug = require('slug'),
    Category = mongoose.model('Category'),
    _ = require('lodash');

exports.findAll = function(req, res){
    Category.find(function(err, categories){
        if(err){
            return res.send(500);
        }
        res.json(categories);
    })
};

exports.create = function(req, res){
    var category = new Category(req.body);
    
    category.save(function(err, newCate){
        if(err){
            return res.send(400);
        }
        res.json(newCate);
    })
};

exports.edit = function(req, res){
    Category.findOne({_id: req.params.id}, function(err, data){
        if(err){
            return res.send(500);
        }
        res.json(data);
    })
};
exports.update = function(req, res){

    var query = {_id: req.params.id};
    var category = req.category;
    category = _.extend(category , req.body);

    category.slug = slug(category.name);

    Category.findOneAndUpdate(query, category, function(err) {
        if (err) {
            return res.json(err)
        } else {
            res.json(category);
        }
    });

    // var query = {_id: req.params.id};

    // var data = {
    //     $set: req.body,

    // }
    // //console.log(data);

    // Category.findOneAndUpdate(query, data, function(err, updated){
    //     if(err){
    //         res.send(err)
    //     }
    //     res.json(updated);
    // })

    
};
exports.delete = function(req, res){
    Category.remove({_id: req.params.id}, function(err, deleted){
        if(err) res.send(err)
        res.json(deleted);
    });
};
exports.findParent = function(req, res){
    Category.find({parent_id: null}, function(err, cates){
        if(err){
            return res.send(500);
        }
        res.json(cates);
    })
};

exports.findNotNull = function(req, res){
    Category.find({parent_id: {$ne:null}}, function(err, data){
        if(err){
            return res.send(500);
        }
        res.json(data);
    })
}

exports.findNamCate =  function(req, res){
    Category.findOne({parent_id: req.params.parent_id}, function(err, data){
        if(err){
            return res.json(500);
        }
        res.json(data);
    })

}

exports.findBySlug = function(req, res){
    //console.log(req.params.slug)
    //res.json(req.params.slug)
    Category.findOne({slug: req.params.slug}, function(err, data){
        if(err){
            return res.json(err)
        }
        res.json(data);
    })
}

exports.findCategoryByParent = function(req, res){
    Category.find({parent_id: req.params.parent_id}, function(err, data){
        if(err) res.json(err);
        res.json(data);
    })
}