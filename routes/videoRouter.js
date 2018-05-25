var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Videos = require('../models/videos');

var videoRouter = express.Router();

videoRouter.use(bodyParser.json());

videoRouter.route('/')
.get(function(req,res,next){
    Videos.find({}, function (err, vid) {
        if (err) throw err;
        res.json(vid);
    });
})
.post(function (req, res, next){
      var videos = req.body;
      Videos.collection.insert(videos, function (err, docs) {
        if (err)
        {
           err.status = 400;
           return next(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.json(docs);
		 });
})

.delete(function (req, res, next){
    Videos.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = videoRouter;
