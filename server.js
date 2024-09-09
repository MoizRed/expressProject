const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const app = require("./app");
//env vars which i assume we are going to export them lol? nO?
const port = process.env.PORT;
const host = process.env.HOST;
console.log(`ENVOIRMENT is ${process.env.NODE_ENV}`);

const db = process.env.DB_STRING.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose.connect(db).then((e) => console.log("connected to DataBase"));



//listening to the port
app.listen(port, () => {
  console.log(`listening at port ${host}:${port}`);
});


