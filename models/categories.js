//grab the things need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// crate a Schema
var categorySchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      default: ""
    },
    videos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Video'
    }],
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Categories = mongoose.model('Category', categorySchema);

// make this available to our Node application
module.exports = Categories;
