const fs = require("fs");
const Tour = require("../model/tourModel");
//const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json", "utf-8"));

exports.getalltours = async (req, res) => {
  try{
 const tours = await Tour.find()
  res.json({
    status : "success", 
    length : tours.length,
    data:{ tours}
  })
}catch(err){

  res.json({
    err})

}
};

exports.addnewtour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.modifytour = (req, res) => {
  res.send("patch");
};

exports.gettourbyid = (req, res) => {
  console.log("in gettourbyid function");
  const paramsid = req.params.id;
  res.json({ status: "success", ...tours[paramsid] });
};

exports.deletetour = async (req, res) => {
try{
  await Tour.deleteOne({_id : req.params.id})
  res.json({
    status : "deleted"

  })
}catch(err){
  console.log(err)
  res.send(err)
}

};
