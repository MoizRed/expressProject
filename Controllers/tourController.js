const fs = require("fs");
const Tour = require("../model/tourModel");
//const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json", "utf-8"));

exports.getalltours = async (req, res) => {
//build query
  const queryObj = {...req.query}
  console.log(queryObj)
  const excludedfields = ['page' , 'sort' , 'limit' , 'fields'];
  excludedfields.forEach(el => delete queryObj[el])

 //TODO
  const query = Tour.find(queryObj)

  // const questy = tour.find()
  // .where ('duration')
  // .equals(5)
  // .where('difficulty')
  // .equals("easy")


  //EXCUTE QUERY
  const tour = await query
res.json({
  status : "sucess",
  data : tour

})
/*
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
*/
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
exports.modifytour = async (req, res) => {

  try{
  const reqid  = req.params.id;
  const tour = await Tour.findByIdAndUpdate(reqid, req.body , {
    new : true
 
  }



)
res.json({status : "success" ,
  changes : tour
})
}catch(err){res.json(err)}




};

exports.gettourbyid = async (req, res) => {
  try{
  const tour =  await Tour.findById(req.params.id)
  res.json({
    status : "success",
    tour : tour
  })
}catch(err){res.json({err})}
};

exports.deletetour = async (req, res) => {
try{
  await Tour.findByIdAndDelete(req.params.id)
  res.json({
    status : "deleted"

  })
}catch(err){
  console.log(err)
  res.send(err)
}

};
