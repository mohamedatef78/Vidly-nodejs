const genres = require('./routes/genres');
const Customers = require('./routes/customers')
const Rentals = require('./routes/rentals');
const Movies = require('./routes/movie');
const Auth = require('./routes/auth');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/cutomers', Customers);
app.use('/api/movies', Movies);
app.use('/api/rentals', Rentals);
app.use('/api/auth', Auth);
module.exports = app;