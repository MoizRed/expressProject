const fs = require("fs");
const Tour = require("../model/tourModel");

//const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json", "utf-8"));

exports.getalltours = async (req, res) => {
  //build query
  //1) Filtering
  const queryObj = { ...req.query };
  console.log(queryObj);
  const excludedfields = ["page", "sort", "limit", "fields"];
  excludedfields.forEach((el) => delete queryObj[el]);

  //2)ADVANCED FILTERING  
  
  let queryStr = JSON.stringify(queryObj)

  // ADVANCED FILTERING IS AMAZING
    queryStr =  queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match =>`$${match}`)
    console.log(JSON.parse(queryStr))


  let query = Tour.find(JSON.parse(queryStr));

  
  //SORTING
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(" ") //split method splits the string into array of elements ; join gather the elements of array (strings) and turn them into one single string.
      const sortby = req.query.sort.replace(/,/g , " ") //better method using regular expression 
      console.log("before " , req.query.sort , "after : " , sortBy , "better" , sortby)
      
      query = query.sort(sortby) 
            
    }else{
      query = query.sort()
    }

    //fields
    if (req.query.fields) {

      const fields = req.query.fields.replace(/,/g , " ")
      query = query.select( fields ) //projecting / selecting the key on the object returns the selected objects wow.. damn im impressed 
      
    }else{
      query = query.select('-__v')

    }

    //PAGINATION TODO: PAGINATION TODO
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100
    const skip = (page - 1) * limit
    query = query.skip(skip).limit(limit) // these two methos are coming from the query string of the mongoose library  

    if(req.query.page){

      const numTours = await Tour.countDocuments();
       if( skip  >= numTours){

        throw new Error('this page does not exist')


       }

    }

  //EXCUTE QUERY
  const tour = await query;
  res.json({
    status: "sucess",
    data: tour,
 

  });
 
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
  try {
    const reqid = req.params.id;
    const tour = await Tour.findByIdAndUpdate(reqid, req.body, {
      new: true,
    });
    res.json({ status: "success", changes: tour });
  } catch (err) {
    res.json(err);
  }
};

exports.gettourbyid = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.json({
      status: "success",
      tour: tour,
    });
  } catch (err) {
    res.json({ err });
  }
};

exports.deletetour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({
      status: "deleted",
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

