//dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const fs = require("fs");
const morgan = require("morgan");

//env vars
const port = process.env.PORT;
const host = process.env.HOST;

//loading the data
const app = express();
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json", "utf-8"));
const Users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))

//midllewares
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  requesttime = new Date().toISOString();
  console.log(requesttime);
  next();
});

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
      requestedAT: requesttime,
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

//user route hanlder
const GetUsers = (req, res) => {
  res.send(Users);
};
const GetUserById = (req, res) => {
    const id = req.params.id
    const user = Users.find(e => e._id === id)
    console.log(id , user)
    res.send(user)


};
const DeleteUser = (req, res) => {
  
    const id = req.params.id
    const UserToDelete = Users.find(e => {e._id === id})
    
    res.json({ status : 'deleted', data :  UserToDelete})


};

const UpateUser = (req, res) => {
  res.status(200).send("ok");
};

//router 

const tourRouter = express.Router();
const userRouter = express.Router();



app.get("/").get(home);
// tour routes 


tourRouter("/").get(getalltours).post(addnewtour);

tourRouter('/:id')
  .get(gettourbyid)
  .patch(modifytour)
  .delete(deletetour);





//user routes
userRouter("/").get(GetUsers);

userRouter("/:id").get(GetUserById).patch(UpateUser).delete(DeleteUser)


// this line mounts the tourRouter, which handles all the routes for the
// tours resource, at the path /api/v1/tours. This means that all the routes
// defined in the tourRouter will have the prefix /api/v1/tours, for example
// the route tourRouter("/").get(getalltours) will be accessible at
// /api/v1/tours/ and tourRouter('/:id').get(gettourbyid) will be accessible
// at /api/v1/tours/:id, and so on.
app.use("/api/v1/users" , userRouter) //a way to create a prefix for the routes in the router so we dont have to write /api/v1/tours everywhere

//listening to the port
app.listen(port, () => {
  console.log(`listening at port ${host}:${port}`);
});
