'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
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
    category_id: {
        type: Schema.ObjectId,
        ref: 'Category',
        default: null
    }
});

mongoose.model('Series', seriesSchema);