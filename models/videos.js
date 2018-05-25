//grab the things need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// crate a Schema
var videoSchema = new Schema({
    etag:{ type:String },
    v_id:{
      kind:{type:String},
      videoId:{
        type:String,
        required:true,
        unique:true
      }
    },
    kind:{ type:String },
    snippet:{
      channelId:{ type:String },
      channelTitle:{ type:String },
      description:{
        type:String,
        required:true
      },
      liveBroadcastContent:{ type:String },
      publishedAt:{ type:String },
      thumbnails:{
        default:{
          height:{type:Number},
          url:{
            type:String,
            required:true
          },
          width:{type:Number}
        },
        high:{
          height:{type:Number},
          url:{
            type:String,
            required:true
          },
          width:{type:Number}
        },
        medium:{
          height:{type:Number},
          url:{
            type:String,
            required:true
          },
          width:{type:Number}
        }
      },
      title:{
        type:String,
        required:true
      }
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Videos = mongoose.model('Video', videoSchema);

// make this available to our Node application
module.exports = Videos;
