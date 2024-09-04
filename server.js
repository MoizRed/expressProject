const dotenv = require("dotenv")
dotenv.config();
const mongoose = require("mongoose")
const app = require("./app");
//env vars which i assume we are going to export them lol? nO? 
const port = process.env.PORT;
const host = process.env.HOST;
console.log( `ENVOIRMENT is ${process.env.NODE_ENV}`)

//define the db then connecting
const db = process.env.DB_STRING.replace("<PASSWORD>" , process.env.DB_PASSWORD)
mongoose.connect(db).then(e => console.log("connected"))


//creating the schema
//schema is basically a blueprint for our document , in other words how do you want your document to be formatted
const Tourschema = new mongoose.Schema({

    name : String,
    Price : Number,
    rating : Number


})

//creating a model which is mounting the schema that we created to the collection  that we want

const Tourmodel =  mongoose.model("tours" , Tourschema )

//now here finally we create the document and start specifying each key value pair 
const tour = new Tourmodel({

    name : "the jumber humber",
    price : 9843,
    rating : 3

})

//we save the the document that we have created to the database 
tour.save().then(value => console.log(value)).catch(err =>console.log(err))

//listening to the port
app.listen(port, () => {
    console.log(`listening at port ${host}:${port}`);
})
