'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Category Schema
 */

var commentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category_id: {
        type: Schema.ObjectId,
        ref: 'Category',
        default: null
    }
});

mongoose.model('Comment', commentSchema);