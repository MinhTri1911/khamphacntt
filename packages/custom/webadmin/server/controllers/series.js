'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Series = mongoose.model('Series');

exports.findAll = function(req, res){
    Series.find(function(err, series){
        if(err){
            return res.send(err);
        }
        res.json(series);
    })
}
exports.create = function(req, res){
    var series = new Series(req.body);
    
    series.save(function(err, newSeries){
        if(err){
            return res.send(400);
        }
        res.json(newSeries);
    })
}
exports.edit = function(req, res){
    Series.findOne({_id: req.params.id}, function(err, data){
        if(err){
            return res.send(500);
        }
        res.json(data);
    })
}
exports.update = function(req, res){
    var query = {_id: req.params.id};

    var data = {
        $set: req.body,
    }
    //console.log(data);

    Series.findOneAndUpdate(query, data, function(err, updated){
        if(err){
            res.send(err)
        }
        res.json(updated);
    })
}
exports.delete = function(req, res){
    Series.remove({_id: req.params.id}, function(err, deleted){
        if(err) res.send(err)
        res.json(deleted);
    });
}