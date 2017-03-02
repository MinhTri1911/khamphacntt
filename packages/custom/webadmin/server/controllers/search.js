'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Post = mongoose.model('Post');

exports.getSearch = function(req, res, next){
    if (!req.query.text || req.query.text === '')
        return res.json({
          error: 'search key must be non-empty',
          total: 0
        });

      Post.paginate({
        title: {
          $regex: '.*' + req.query.text.replace(' ','|') + '.*'
        },
        published: 'Yes',
        status: 'show'
      }, {
        select: {
          title: 1,
          slug: 1,
          _id: 0
        },
        page: req.query.page,
        limit: req.query.limit
      }, function (err, post, pageCount, itemCount) {
        if (err) return next(err);
        pageCount = pageCount || 1;
        res.json({
          data: post.docs,
          limit: post.limit,
          page: post.page,
          pages: post.pages,
          total: post.total
        });
      });
}