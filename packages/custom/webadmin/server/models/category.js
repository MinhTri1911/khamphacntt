'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    slug = require('slug'), //npm i slug --save,
    Schema = mongoose.Schema;

/**
 * Category Schema
 */

var cateSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String
    },
    description: {
        type: String
    },
    keywords: {
    	type: String
    },
    status: {
    	type: String,
        enum: ['show', 'hide'],
        default: 'show'
    },
    parent_id: {
    	type: Schema.ObjectId,
        ref: 'Category',
    	default: null
    }
});

cateSchema.pre('save', function(next) {
    this.slug = slug(this.name);
    return next();
});

cateSchema.pre('update', function(next) {
    this.slug = slug(this.name);
    return next();
});

mongoose.model('Category', cateSchema);