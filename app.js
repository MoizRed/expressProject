//dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const fs = require("fs");
const morgan = require('morgan')

//env vars
const port = process.env.PORT;
const host = process.env.HOST;


//loading the data
const app = express();
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json", "utf-8"));



//midllewares
app.use(express.json());
app.use(morgan("dev"));
app.use((req , res , next )=>{

     requesttime = new Date().toISOString()
    console.log(requesttime)
    next()

})


//routes handlers
const home = (req, res) => {
  res.send("home");
};

const getalltours = (req, res) => {
  if (!tours) {
    res.status(500).json({
      status: "Internal server error",
      data: null,
    });
  } else {
    res.status(200).json({
      status: "sucess",
      requestedAT : requesttime,
      data: {
        tours,
      },
    });
  }
};

const addnewtour = (req, res) => {
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
const modifytour = (req, res) => {
  res.send("patch");
};

const gettourbyid = (req, res) => {
  const paramsid = req.params.id;

  if (paramsid > tours.length) {
    res.json({ status: "Failed", reason: "overflow" });
  } else {
    console.log(paramsid);
    res.json({ status: "success", ...tours[paramsid] });
  }
};

const deletetour = (req, res) => {
  tours.splice(req.params.id, 1);
  res.json({ status: "deleted", ...tours });
};


//routes
app.route("/").get(home);

app.route("/api/v1/tours").get(getalltours).post(addnewtour);

app
  .route("/api/v1/tours/:id")
  .get(gettourbyid)
  .patch(modifytour)
  .delete(deletetour);


//listening to the port
app.listen(port, () => {
    console.log(`listening at port ${host}:${port}`);
  });
  