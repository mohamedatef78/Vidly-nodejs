const {Genre} = require('../Models/Genres');
const auth =  require('../Middleware/auth');

const Joi = require('joi');

const express = require('express');
const router = express.Router();

router.get('/',auth.protect, async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.post('/', auth.protect , auth.restictTo('admin'),async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new  Genre({name:req.body.name});
   genre = await genre.save();
  res.send(genre);
});

router.put('/:id',auth.protect, async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name , new:true});
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  
  res.send(genre);
});

router.delete('/:id', auth.protect,async (req, res) => {
  const genre =await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.get('/:id',auth.protect,async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;