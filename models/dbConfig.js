const mongoose = require("mongoose");

 const connectDb= ()=>  {
  mongoose
    .connect("mongodb://localhost:27017")
    .then(() => console.log("database connected"))
    .catch((err) => console.error(err));
}

module.exports=connectDb