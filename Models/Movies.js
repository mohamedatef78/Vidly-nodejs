const  mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./Genres');


const movieSchema =  mongoose.Schema({
    title:{
        type:String ,
        trim:true,
        required: true
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        min:0,
        max:255,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        min:0,
        max:255,
        reuired:true
    }
})

function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(5).required(),
      genreId: Joi.objectId().required(),
      numberInStock: Joi.number().min(0).max(255).required(),
      dailyRentalRate: Joi.number().min(0).max(255).required()
    };
  
    return Joi.validate(movie, schema);
  }


const Movie = new mongoose.model('Movies' ,movieSchema );


exports.movieSchema= movieSchema;
exports.Movie = Movie ;
exports.validate =validateMovie;
