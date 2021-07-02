const Customer = require('../Models/Customer');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

router.get('/',async (req, res) => {
    const customer = await Customer.find();
    res.send(customer);
  });
  
  router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer = new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    });
     customer = await customer.save();
    res.send(customer);
  });
  
  router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name , new:true});
    if (!customer) return res.status(404).send('The genre with the given ID was not found.');
  
    
    res.send(customer);
  });
  
  router.delete('/:id', async (req, res) => {
    const customer =await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(customer);
  });
  
  router.get('/:id',async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The genre with the given ID was not found.');
    res.send(customer);
  });
  
  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).required(),
      phone: Joi.number().min(11).required(),
      isGold : Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
  }


module.exports = router;