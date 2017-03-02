'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    slug = require('slug'),
    Schema = mongoose.Schema;

/**
 * Category Schema
 */

var postSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description:{
        type: String
    },
    content: {
        type: String,
        required: true
    },
    keywords: {
        type: String
    },
    image: {
        type: String,
        default: null
    },
    images: [{
        type: String
    }],
    published_on: {
        type: Date,
        default: Date.now
    },
    published: {
        type: String, 
        enum: ['Yes', 'No'],
        default: 'Yes'
    },
    slug: {
        type: String
    },
    status: {
        type: String, 
        enum: ['show', 'hide'],
        default: 'show'
    },
    author: {
        type: String
    },
    rate: {
        type: Number,
        default: 0
    },
    view_count: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    next_new_id: {
        type: Schema.ObjectId,
        ref: 'News',
        default: null
    },
    previous_new_id: {
        type: Schema.ObjectId,
        ref: 'News',
        default: null
    },
    news_series_id: {
        type: Schema.ObjectId,
        ref: 'Series',
        default: null
    },
    user_id: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    category_id: {
        type: Schema.ObjectId,
        ref: 'Category',
        default: null
    },
    tags: [{
        text: {
            type: String
        }    
    }],
    series:[]
});

postSchema.pre('save', function(next) {
  this.slug = slug(this.title);
  return next();
});

postSchema.pre('update', function(next) {
    this.slug = slug(this.title);
    return next();
});

postSchema.plugin(require('mongoose-paginate'));

try {
  mongoose.model('Post')
} catch (error) {
  mongoose.model('Post', postSchema);
}