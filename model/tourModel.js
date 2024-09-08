const mongoose = require("mongoose");
const db = process.env.DB_STRING.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(db).then((e) => console.log("connected to DataBase"));


const Tourschema = new mongoose.Schema({
    id : {type : Number,
        unique : true,
        required : true
    }
        
        ,
  name: {
    type : String,
    unique : false,
    default : `Tour `,
  
  },
  Price:{ type  : Number,
    required : false, 
    default : 100
},

  rating: {type : Number ,
    default : 3.5
}

});

const Tour = mongoose.model("tours", Tourschema);

module.exports = Tour;
