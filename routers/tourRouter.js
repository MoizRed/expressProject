const express = require("express")
const Router = express.Router()
const tourController = require("../Controllers/tourController.js")


//ID checking middleware
Router.param("id" , tourController.checkID)



Router.route("/") 
.get(tourController.getalltours)
.post(tourController.checkBody , tourController.addnewtour); //chaining middlewares is easy omg?

Router.route("/:id")
.get(tourController.gettourbyid)
.patch(tourController.modifytour)
.delete(tourController.deletetour);

module.exports = Router