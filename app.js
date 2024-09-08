//dependencies
const express = require("express");
const morgan = require("morgan");

// main app
const app = express();

//sub-app routers
const userRouter = require("./routers/userRouter");
const tourRouter = require("./routers/tourRouter");
const productRouter = require("./routers/productRouter");

//midllewares

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`./public`));

//routes handlers
const home = (req, res) => {
  res.sendfile("./public/overview.html");
};

//routes
app.route("/").get(home);

//mounting the sub-routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

module.exports = app;
