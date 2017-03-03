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

var seriesSchema = new Schema({
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
    slug:{
        type: String
    },
    category_id: {
        type: Schema.ObjectId,
        ref: 'Category',
        default: null
    }
});

seriesSchema.pre('save', function(next) {
  this.slug = slug(this.name);
  return next();
});

seriesSchema.pre('update', function(next) {
    this.slug = slug(this.name);
    return next();
});

try {
  mongoose.model('Series')
} catch (error) {
  mongoose.model('Series', seriesSchema);
}