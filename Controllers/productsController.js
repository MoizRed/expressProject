const Product = require("../model/productModel")

//product route handler
exports.getProducts = async (req, res) => {

  const products = await Product.find()
    res.send(products);
  };
  


exports.getProductById = (req, res) => {
    res.send("Product by ID");
  };

exports.addNewProduct = (req, res) => {
    res.send("added");
  };

