
const fs = require("fs");
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json", "utf-8"));



exports.getalltours = (req, res) => {
    if (!tours) {
      res.status(500).json({
        status: "Internal server error",
        data: null,
      });
    } else {
      res.status(200).json({
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
    res.send("done");
    const body = req.body;
    const newid = tours[tours.length - 1].id + 1;
    const newtour = { id: newid, ...body }; //same as object.assin lol spread is better btw
    tours.push(newtour);
    console.log(newid, newid);
  
    fs.writeFile("./data/tours-simple.json", JSON.stringify(tours), () => {
      console.log("written");
      res.status(201);
    });
  };
exports.modifytour = (req, res) => {
    res.send("patch");
  };
  
exports.gettourbyid = (req, res) => {
    const paramsid = req.params.id;
  
    if (paramsid > tours.length) {
      res.json({ status: "Failed", reason: "overflow" });
    } else {
      console.log(paramsid);
      res.json({ status: "success", ...tours[paramsid] });
    }
  };
  
  exports.deletetour = (req, res) => {
    tours.splice(req.params.id, 1);
    res.json({ status: "deleted", ...tours });
  };
  