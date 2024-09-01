const express = require("express")
const Router = express.Router()
const userController = require("../Controllers/userController.js")


Router.route("/")
.get(userController.GetUsers);

Router.route("/:id")
.get(userController.GetUserById)
.patch(userController.UpateUser)
.delete(userController.DeleteUser);


module.exports = Router