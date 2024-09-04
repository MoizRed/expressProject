const dotenv = require("dotenv")
dotenv.config();
const app = require("./app");
//env vars which i assume we are going to export them lol? nO? 
const port = process.env.PORT;
const host = process.env.HOST;
console.log( `ENVOIRMENT is ${process.env.NODE_ENV}`)

//listening to the port
app.listen(port, () => {
    console.log(`listening at port ${host}:${port}`);
})