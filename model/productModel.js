const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({

    name : {
        type : [String  , "product must have a name"],
        required : true }, 
    price : Number , 
    wieght : Number , 
    size : Number , 
    description : String




})


const Product = mongoose.model("products" , ProductSchema)


module.exports = Product