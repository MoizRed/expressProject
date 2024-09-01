
const fs = require("fs");
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json", "utf-8"));

exports.checkID = ((req , res , next , val)=>{

  if(val * 1 > tours.length ) {
      return res.status(404).json({
          status :" fail" ,
          message : "invalid ID"


      })

  }else{

  next()
  }
})

exports.checkBody = (req , res , next) =>{

  const body = req.body ; 
  if('name' in body && req.body.price){
    console.log('valid body')
    next()
}else{
  console.log("INVALID REQUEST")
 return res.status(404).json({
  status : "failed",
  reason : "INVALID BODY"

 })
}
}

exports.getalltours = (req, res) => {
    if (!tours) {
      return res.status(500).json({
        status: "Internal server error",
        data: null,
      });
    } else {
     return res.status(200).json({
        status: "sucess",
        requestedAT: requesttime,
        data: {
          tours,
        },
      });
    }
  };
  
  

exports.addnewtour = (req, res) => {
    console.log(req.body);
    const body = req.body;
    const newid = tours[tours.length - 1].id + 1;
    const newtour = { id: newid, ...body }; //same as object.assin lol spread is better btw
    tours.push(newtour);
    console.log(newid, newid);
  
    fs.writeFile("./data/tours-simple.json", JSON.stringify(tours), () => {
      console.log("written");
      res.status(201).send(("created"));
    });
  };
exports.modifytour = (req, res) => {
    res.send("patch");
  };
  
exports.gettourbyid = (req, res) => {
      console.log("in gettourbyid function")
      const paramsid = req.params.id
      res.json({ status: "success", ...tours[paramsid] });
    
  };
  
  exports.deletetour = (req, res) => {
    tours.splice(req.params.id, 1);
    res.json({ status: "deleted", ...tours });
  };
  