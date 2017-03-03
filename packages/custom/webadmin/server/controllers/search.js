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

exports.getPostByCategoryPagination = function(req, res, next){
    Post.paginate({category_id: req.params.category_id},
      {
        select: {
          title: 1,
          description: 1,
          content: 1,
          image: 1,
          slug: 1,
          author: 1,
          view_count: 1,
          created_at: 1,
          news_series_id: 1,
          category_id: 1,
          tags: 1,
          series: 1,
          _id: 1
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

exports.getPostBySeriesPagination = function(req, res, next){
    Post.paginate({news_series_id: req.params.news_series_id},
      {
        select: {
          title: 1,
          description: 1,
          content: 1,
          image: 1,
          slug: 1,
          author: 1,
          view_count: 1,
          created_at: 1,
          news_series_id: 1,
          category_id: 1,
          tags: 1,
          series: 1,
          _id: 1
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