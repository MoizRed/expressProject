//dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const fs = require("fs");
const morgan = require("morgan");

//env vars
const port = process.env.PORT;
const host = process.env.HOST;

// main app
const app = express();

//sub-app routers
const userRouter = require("./routers/userRouter")
const tourRouter = require("./routers/tourRouter")
const productRouter = require("./routers/productRouter")

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

//routes
app.route("/").get(home)

//mounting the sub-routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

//listening to the port
app.listen(port, () => {
  console.log(`listening at port ${host}:${port}`);
});
