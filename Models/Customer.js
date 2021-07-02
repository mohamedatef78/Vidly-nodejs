const mongoose  = require('mongoose');

const customerSchema = new mongoose.Schema({
    name : {
        type:String,
        minLenght:5,
        maxLenght:15,
        required:true
    },
    phone : {
        type:Number,
        minLenght:11,
        maxLenght:11,
        required:true
    },
    isGoled: {type:Boolean  ,default:false}

});


const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;