const express = require("express")
const Router = express.Router()
const productsController = require("../Controllers/productsController")
  
//product routes
Router.route("/")
.get(productsController.getProducts)
.post(productsController.addNewProduct);

Router.route("/:id")
.get(productsController.getProductById);


module.exports =  Router