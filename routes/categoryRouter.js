var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Categories = require('../models/categories');
var Videos = require('../models/videos');

var categoryRouter = express.Router();

categoryRouter.use(bodyParser.json());

categoryRouter.route('/')
.get(function(req,res,next){
    Categories.find({}).
      populate('videos').
      exec( function (err, cat)
      {
        if (err) {
          console.log(err);
          err.status = 400;
          return next(err);
        }
        res.json(cat);
      });
})
.post(function (req, res, next){
  Videos.collection.insert(req.body.videos, function (err, docs)
  {
    if (err)
    {
       console.log(err);
       err.status = 400;
       return next(err);
    }
    console.log(docs.insertedIds);
    var query = {name:req.body.categoryName},
        update = { $addToSet: { videos: { $each: Object.values(docs.insertedIds) } } }
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Categories.findOneAndUpdate(query, update, options, function(err, result)
    {
      if (err)
      {
         err.status = 400;
         return next(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.json(result);
    });
  });
})

.delete(function (req, res, next){
    Categories.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = categoryRouter;
