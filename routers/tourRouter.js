const express = require("express")
const Router = express.Router()
const tourController = require("../Controllers/tourController.js")


Router.route("/")
.get(tourController.getalltours)
.post(tourController.addnewtour);

Router.route("/:id")
.get(tourController.gettourbyid)
.patch(tourController.modifytour)
.delete(tourController.deletetour);

module.exports = Router