const express = require("express")
const Router = express.Router()
const productsController = require("../Controllers/productsController.js")
  
//product routes
Router.route("/")
.get(productsController.getProduct)
.post(productsController.addNewProduct);

Router.route("/:id")
.get(productsController.getProductById);


module.exports =  Router