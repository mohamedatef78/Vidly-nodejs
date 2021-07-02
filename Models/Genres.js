const mongoose  = require('mongoose');


const genreSchema=   mongoose.Schema({
    name:{
      type:String,
      require:true
    }
  })

const Genre = new mongoose.model('Genre' ,genreSchema );

exports.genreSchema= genreSchema;
exports.Genre = Genre ;