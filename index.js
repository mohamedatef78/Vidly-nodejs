const genres = require('./routes/genres');
const Customers = require('./routes/customers')
const Rentals = require('./routes/rentals');
const Movies = require('./routes/movie');
const Auth = require('./routes/auth');
const Error = require('./utils/Error');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();

app.use(express.json());

//Routes
app.use('/api/genres', genres);
app.use('/api/cutomers', Customers);
app.use('/api/movies', Movies);
app.use('/api/rentals', Rentals);
app.use('/api/auth', Auth);

app.all('*', (req,res,next)=>{
    next(new Error(`can't find ${req.originalUrl} on this server`,404));
});
module.exports = app;